const express = require('express');
const app = express();
const path = require('path');

app.use('/build', express.static('build'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
})

