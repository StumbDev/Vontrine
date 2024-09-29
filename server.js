// Suggested code may be subject to a license. Learn more: ~LicenseLog:3881777538.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2378435235.
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'ui.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
