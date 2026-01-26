import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('✅ Connected to MongoDB Atlas'))
        .catch(err => console.error('❌ MongoDB connection error:', err));
} else {
    console.warn('⚠️ MONGODB_URI not found. Server will start but database features won\'t work.');
}

// Schemas
const vaultSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true }
});

const userStatsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    data: { type: Object, required: true }
}, { minimize: false, timestamps: true });

const Vault = mongoose.model('Vault', vaultSchema);
const UserStats = mongoose.model('UserStats', userStatsSchema);

// --- API Routes ---

// Get entire vault (demo compatibility)
app.get('/api/vault', async (req, res) => {
    try {
        const vault = await Vault.find({});
        res.json(vault);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read vault' });
    }
});

// Update vault (register new user)
app.post('/api/vault', async (req, res) => {
    try {
        const { email, passwordHash } = req.body;
        if (!email || !passwordHash) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const normalizedEmail = email.toLowerCase();
        const existingUser = await Vault.findOne({ email: normalizedEmail });

        await Vault.findOneAndUpdate(
            { email: normalizedEmail },
            { email: normalizedEmail, passwordHash },
            { upsert: true, new: true }
        );

        if (!existingUser) {
            console.log(`🆕 NOVOPEČENÝ VELITEL ZAREGISTROVÁN: ${normalizedEmail}`);
        } else {
            console.log(`🔐 AKTUALIZACE PŘÍSTUPU PRO: ${normalizedEmail}`);
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vault' });
    }
});

// Get user stats
app.get('/api/stats/:email', async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const record = await UserStats.findOne({ email });

        if (record) {
            console.log(`📥 Loaded stats from DB for: ${email}`);
            res.json(record.data);
        } else {
            console.log(`ℹ️  No stats found in DB for: ${email}`);
            res.json(null);
        }
    } catch (error) {
        console.error('❌ Error reading stats from DB:', error);
        res.status(500).json({ error: 'Failed to read stats' });
    }
});

// Save user stats
app.post('/api/stats/:email', async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const stats = req.body;

        await UserStats.findOneAndUpdate(
            { email },
            { email, data: stats },
            { upsert: true, new: true }
        );

        console.log(`💾 Saved stats to DB for: ${email}`);
        res.json({ success: true, message: 'Stats saved to MongoDB' });
    } catch (error) {
        console.error('❌ Error saving stats to DB:', error);
        res.status(500).json({ error: 'Failed to save stats' });
    }
});

// Delete user data
app.delete('/api/stats/:email', async (req, res) => {
    try {
        const email = req.params.email.toLowerCase();
        const result = await UserStats.deleteOne({ email });
        await Vault.deleteOne({ email });

        if (result.deletedCount > 0) {
            console.log(`🗑️  Deleted stats from DB for: ${email}`);
            res.json({ success: true, message: 'Data deleted from MongoDB' });
        } else {
            res.json({ success: true, message: 'No data to delete' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: mongoose.connection.readyState === 1 ? 'ok' : 'connecting',
        mongo: mongoose.connection.readyState,
        timestamp: new Date().toISOString()
    });
});

// Static files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 MongoDB Integration Active`);
});
