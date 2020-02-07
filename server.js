const express = require('express');
const path = require('path');
const app = express();

app.use('/bin', express.static(path.join(__dirname,  'bin')))
app.use('/src/assets', express.static(path.join(__dirname,  'src/assets')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Listening...'));
