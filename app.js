const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// THIS LINE IS CRITICAL: It makes the 'public' folder accessible to the browser
app.use('/familytree', express.static(path.join(__dirname, 'public')));
app.get('/familytree', (req, res) => {
    res.render('index');
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`HVAC site live at http://localhost:${PORT}/familytree`);
});

