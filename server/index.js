const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

app.use(cors());


const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}


const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});


app.get('/files', (req, res) => {
    fs.readdir(uploadDirectory, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(files);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
