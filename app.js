const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const familyMembers = require('./members'); 
app.set('view engine', 'ejs');
app.use('/familytree', express.static(path.join(__dirname, 'public')));
app.get('/familytree', (req, res) => { res.render('index');});
app.get('/familytree/poem', (req, res) => {res.render('poem');});

app.get('/familytree/profile/:id', (req, res) => {
    const memberId = req.params.id;
    const memberData = familyMembers[memberId];
    if (memberData) {
        const photoDir = path.join(__dirname, 'public');
        fs.readdir(photoDir, (err, files) => {
            if (err) {
                console.error("Could not read directory", err);
                return res.render('profile', { member: { ...memberData, album: [] } });
            }
            const automatedAlbum = files
                .filter(file => file.toLowerCase().startsWith(memberId.toLowerCase()))
                .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
                .map(file => file);
            res.render('profile', { member: {...memberData, album: automatedAlbum } });
        });
    } else {
        res.status(404).send("Family member not found.");
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Site live at http://localhost:${PORT}/familytree`);
});
