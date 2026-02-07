const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

// THIS LINE IS CRITICAL: It makes the 'public' folder accessible to the browser
app.use(express.static(path.join(__dirname, 'public')));

app.get('/familytree', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Family Photos site live at http://localhost:${PORT}/familytree`);
});
