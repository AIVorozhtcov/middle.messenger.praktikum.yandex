import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, 'src/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src/dist/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
