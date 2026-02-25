const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] Incoming ${req.method} request to ${req.url}`);
    next();
});

const DB_FILE = './database.json';

const readDB = () => {
    if (!fs.existsSync(DB_FILE)) return {};
    return JSON.parse(fs.readFileSync(DB_FILE));
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- NEW: A friendly homepage to stop the "Cannot GET" error ---
app.get('/', (req, res) => {
    res.send('<h1>✅ Vilarci Backend is Running Perfectly!</h1><p>To see profile data, go to: <a href="/api/profile">/api/profile</a></p>');
});

// 1. PULL ENDPOINT
app.get('/api/profile', (req, res) => {
    const db = readDB();
    if (db.partnerProfile) {
        res.status(200).json(db.partnerProfile);
    } else {
        res.status(404).json({ message: "No profile data found yet." });
    }
});

// 2. PUSH ENDPOINT
app.post('/api/profile', (req, res) => {
    const profileData = req.body;
    
    const db = readDB();
    db.partnerProfile = profileData;
    writeDB(db);

    console.log("✅ Data successfully saved to database.json!\n");
    res.status(200).json({ message: "Sync successful!" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Vilarci Server is RUNNING!`);
    console.log(`📡 Listening for USB and Wi-Fi on Port: ${PORT}`);
});