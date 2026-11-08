/**
 * AMAN · أمان - Production Server
 * Clean Architecture: Native SQLite (node:sqlite), Security Middleware, Services Layer
 * Platform for Prevention of Violence Against Women in Morocco
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');

// Services & Database
const { db, initDatabase } = require('./src/db/database');
const communityService = require('./src/services/community.service');
const aiService = require('./src/services/ai.service');
const authService = require('./src/services/auth.service');
const security = require('./src/middleware/security');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

/**
 * Main HTTP Request Dispatcher
 */
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  // Apply Security Headers
  security.applySecurityHeaders(res);

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API: CHAT (AI COUNSELING) ---
  if (pathname === '/api/chat' && method === 'POST') {
    if (!security.checkRateLimit(clientIp, 40, 60000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'rate_limit_exceeded', code: 'rate_limited' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        let payload = {};
        if (req.headers['content-type']?.includes('application/json')) {
          payload = JSON.parse(body || '{}');
        } else {
          const match = body.match(/\{[\s\S]*\}/);
          if (match) payload = JSON.parse(match[0]);
        }

        const userMsg = security.sanitizeText(payload.message || '');
        const history = payload.history || [];
        const replyLang = payload.replyLang || 'auto';
        const uiLang = payload.uiLang || 'ar';

        const reply = await aiService.processChat({ message: userMsg, history, replyLang, uiLang });

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, reply }));
      } catch (err) {
        console.error('Chat error:', err);
        const fallback = aiService.generateLocalExpertReply('', [], 'darija', 'ar');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, reply: fallback }));
      }
    });
    return;
  }

  // --- API: COMMUNITY SESSION ---
  if (pathname === '/api/community/session' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      user: {
        id: 'usr_guest',
        name: 'مشاركة (هوية محفوظة)',
        verified: false,
        kind: 'person'
      }
    }));
    return;
  }

  // --- API: COMMUNITY FEED & POSTS ---
  if (pathname.startsWith('/api/community/feed') || pathname === '/api/community/mine' || (pathname === '/api/community/posts' && method === 'GET')) {
    const category = parsedUrl.query.category || '';
    const search = parsedUrl.query.q || '';
    const page = parseInt(parsedUrl.query.page, 10) || 0;

    const posts = communityService.getFeed({ category, search, page });
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ posts, total: posts.length, page }));
    return;
  }

  // --- API: COMMUNITY PUBLISH & POST CREATE ---
  if ((pathname === '/api/community/publish' || pathname === '/api/community/posts') && method === 'POST') {
    if (!security.checkRateLimit(clientIp, 20, 60000)) {
      res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'rate_limited' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        let data = {};
        if (req.headers['content-type']?.includes('application/json')) {
          data = JSON.parse(body || '{}');
        } else {
          const match = body.match(/\{[\s\S]*\}/);
          if (match) data = JSON.parse(match[0]);
          else {
            data = {
              title: (body.match(/name="title"[\r\n]+([^\r\n]+)/)?.[1] || '').trim(),
              body: (body.match(/name="body"[\r\n]+([^\r\n]+)/)?.[1] || '').trim(),
              category: (body.match(/name="category"[\r\n]+([^\r\n]+)/)?.[1] || 'general').trim(),
              isAnonymous: /name="isAnonymous"[\r\n]+(true|on|1)/i.test(body)
            };
          }
        }

        const newPost = communityService.createPost({
          authorName: security.sanitizeText(data.author),
          isAnonymous: data.isAnonymous !== false,
          category: data.category || 'general',
          title: security.sanitizeText(data.title),
          body: security.sanitizeText(data.body),
          imageUrl: data.image || null
        });

        security.logAudit('post_created', { id: newPost.id, category: newPost.category }, clientIp);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, post: newPost }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message || 'invalid_input' }));
      }
    });
    return;
  }

  // --- API: COMMUNITY LIKE TOGGLE ---
  if (pathname === '/api/community/like' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { id, liked } = JSON.parse(body || '{}');
        const result = communityService.toggleLike(id, clientIp);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'failed' }));
      }
    });
    return;
  }

  // --- API: COMMUNITY COMMENTS ---
  if (pathname.startsWith('/api/community/comments')) {
    if (method === 'GET') {
      const postId = parsedUrl.query.post;
      const comments = db.prepare('SELECT id, author_name as author, text, is_anonymous, created_at FROM comments WHERE post_id = ? ORDER BY created_at ASC').all(postId || '');
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ comments }));
      return;
    }
    if (method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { postId, text, author } = JSON.parse(body || '{}');
          const cleanText = security.sanitizeText(text);
          const comment = communityService.addComment(postId, {
            authorName: security.sanitizeText(author),
            text: cleanText,
            isAnonymous: true
          });
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, comment }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'failed' }));
        }
      });
      return;
    }
  }

  // --- API: COMMUNITY READING TOOLS ---
  if (pathname === '/api/community/read' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { id, mode } = JSON.parse(body || '{}');
        const post = db.prepare('SELECT title, body FROM posts WHERE id = ?').get(id) || { title: '', body: '' };
        let text = '';
        if (mode === 'summary') {
          text = `خلاصة الموضوع: ${post.title}. النقطة الأساسية هي معرفة الإجراءات الوقائية، الشهادة الطبية من المستشفى، والاتصال بالأرقام المعتمدة (19 / 177 / 8350).`;
        } else if (mode === 'simple') {
          text = `توضيح مسطري مبسط: في حال التعرض لأي ضرر، القانون المغربي يتيح لكِ الحماية الفورية. الخطوة الأولى فحص طبي والحصول على شهادة عجز، ثم التوجه للدائرة الأمنية أو مصالح الدرك أو الاتصال بخط 8350.`;
        } else if (mode === 'explain') {
          text = `المصطلحات القانونية المعتمدة:\n• القانون 103-13: الإطار القانوني المغربي لمحاربة العنف ضد النساء وتخويل وكيل الملك تدابير الطرد والحماية.\n• طلاق الشقاق: مسطرة يختص بها قسم قضاء الأسرة وتمنح الحقوق الثابتة للزوجة والأبناء دون اشتراط موافقة الزوج.\n• مدة العجز (ITT): تقدير الضرر البدني المثبت بشهادة طبية معتمدة.`;
        } else {
          text = post.body;
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, text }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'failed' }));
      }
    });
    return;
  }

  // --- API: HEALTH CHECK ---
  if (pathname === '/api/health') {
    const postCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'AMAN Institutional Platform',
      database: 'SQLite 3 (WAL mode)',
      persistedPosts: postCount,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
      uptime: process.uptime(),
      time: new Date().toISOString()
    }));
    return;
  }

  // --- STATIC FILE SERVING ---
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    if (ext === '.html') {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (['.png', '.jpg', '.jpeg', '.svg', '.woff2'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`AMAN Platform Server (Native SQLite Layer)`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Database: SQLite (WAL Mode, Persisted)`);
  console.log(`Emergency Hub: 19 (Police) | 177 (Gendarmerie) | 8350 (UNFM)`);
  console.log(`===============================================`);
});
