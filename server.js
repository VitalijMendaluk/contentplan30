const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.dirname(__filename);
const PORT = 3456;

http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const file = path.join(root, url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file).slice(1);
    const types = { html: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log('Server running on ' + PORT));
