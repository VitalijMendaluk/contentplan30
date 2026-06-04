const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.dirname(__filename);
http.createServer((req, res) => {
  const file = path.join(root, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    const ext = path.extname(file).slice(1);
    const ct = { html: 'text/html', css: 'text/css', js: 'application/javascript' }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  });
}).listen(3457, () => console.log('ready'));
