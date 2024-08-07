import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = http.createServer(async (req, res) => {
  console.log('server host', req.headers.host);
  let filePath;
  try {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;
    switch (route) {
      case '/':
        filePath = path.join(__dirname, 'public', 'index.html');
        break;
      case '/about':
        filePath = path.join(__dirname, 'public', 'about.html');
        break;
      case '/contact-me':
        filePath = path.join(__dirname, 'public', 'contact-me.html');
        break;
      default:
        filePath = path.join(__dirname, 'public', '404.html');
        res.statusCode = 404;
    }

    const data = await fs.readFile(filePath);
    res.setHeader('Content-type', 'text/html');
    res.write(data);
    res.end();
  } catch (error) {
    req.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
