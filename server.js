import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__filename', __filename);
console.log('__dirname', __dirname);

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);
  try {
    if (req.method === 'GET') {
      const route = req.url;
      let filePath;
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
          throw new Error('Not Found');
      }

      const data = await fs.readFile(filePath);
      res.setHeader('Content-type', 'text/html');
      res.write(data);
      res.end();
    } else {
      throw new Error('Method not allowed');
    }
  } catch (error) {
    req.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
