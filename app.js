const express = require('express');
const path = require('path');
const app = express();

// Import the data file you created
const familyMembers = require('./members'); 

app.set('view engine', 'ejs');

// Serves images/css from the public folder
app.use('/familytree', express.static(path.join(__dirname, 'public')));

// The Main Tree Page
app.get('/familytree', (req, res) => {
    res.render('index');
});

app.get('/familytree/profile/:id', (req, res) => {
    const memberId = req.params.id;
    const memberData = familyMembers[memberId];

    if (memberData) {
        res.render('profile', { member: memberData });
    } else {
        res.status(404).send("Family member not found. Check if the ID matches in members.js");
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Site live at http://localhost:${PORT}/familytree`);
});
