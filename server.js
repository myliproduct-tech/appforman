import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';


// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
    console.error('❌ GOOGLE_CLIENT_ID not found in environment variables!');
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);



// Middleware
app.use(cors({
    origin: ['https://myliproduct-tech.github.io', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
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
    passwordHash: { type: String, required: true },
    recoveryKey: { type: String } // Plain text as requested for admin access
});

const userStatsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    data: { type: Object, required: true }
}, { minimize: false, timestamps: true });

const Vault = mongoose.model('Vault', vaultSchema);
const UserStats = mongoose.model('UserStats', userStatsSchema);

// --- Helpers ---
const hashPassword = (password) => {
    // Hidden from Atlas eyes, but verifiable
    return crypto.createHash('sha256').update(password).digest('hex');
};

// --- API Routes ---

// Get entire vault (DEPRECATED for security, but keeping for compatibility if needed)
app.get('/api/vault', async (req, res) => {
    try {
        const vault = await Vault.find({}, { passwordHash: 0 }); // Don't send hashes to client!
        res.json(vault);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read vault' });
    }
});

// Update vault (register new user)
app.post('/api/vault', async (req, res) => {
    try {
        const { email, passwordHash, recoveryKey } = req.body;
        if (!email || !passwordHash) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const normalizedEmail = email.toLowerCase();
        const existingUser = await Vault.findOne({ email: normalizedEmail });

        const hashedPassword = hashPassword(passwordHash);
        const updateData = { email: normalizedEmail, passwordHash: hashedPassword };
        if (recoveryKey) updateData.recoveryKey = recoveryKey;

        await Vault.findOneAndUpdate(
            { email: normalizedEmail },
            updateData,
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

// Standard Login Verification
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email a heslo jsou vyžadovány' });

        const normalizedEmail = email.toLowerCase();
        const user = await Vault.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(401).json({ error: 'Uživatel nenalezen' });
        }

        const hashedPassword = hashPassword(password);
        if (user.passwordHash === hashedPassword || user.passwordHash === password) { // Allow transition for existing plain text
            console.log(`📡 VELITEL PŘIHLÁŠEN: ${normalizedEmail}`);
            return res.json({ success: true, email: normalizedEmail });
        }

        res.status(401).json({ error: 'Nesprávné heslo' });
    } catch (error) {
        res.status(500).json({ error: 'Login error' });
    }
});

// Reset password via recovery key
app.post('/api/vault/reset', async (req, res) => {
    try {
        const { email, recoveryKey, newPassword } = req.body;
        if (!email || !recoveryKey || !newPassword) {
            return res.status(400).json({ error: 'Chybějící údaje pro reset' });
        }

        const user = await Vault.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ error: 'Uživatel nenalezen' });
        }

        if (user.recoveryKey !== recoveryKey) {
            return res.status(401).json({ error: 'Neplatný nouzový klíč' });
        }

        user.passwordHash = hashPassword(newPassword);
        await user.save();

        console.log(`🔄 HESLO RESETOVÁNO PRO: ${email}`);
        res.json({ success: true, message: 'Heslo bylo úspěšně změněno' });
    } catch (error) {
        res.status(500).json({ error: 'Internal reset error' });
    }
});

// Google Auth Verification
app.post('/api/auth/google', async (req, res) => {
    try {
        const { token, type } = req.body;
        if (!token) return res.status(400).json({ error: 'Token is required' });

        let email, googleId;

        if (type === 'access') {
            // Verify access token
            const tokenInfo = await client.getTokenInfo(token);
            email = tokenInfo.email;
            googleId = tokenInfo.sub;
        } else {
            // Verify ID token
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            if (payload) {
                email = payload.email;
                googleId = payload.sub;
            }
        }

        if (!email) return res.status(401).json({ error: 'Invalid token or missing email scope' });
        const normalizedEmail = email.toLowerCase();

        // Check if user exists in vault
        let user = await Vault.findOne({ email: normalizedEmail });

        if (!user) {
            user = new Vault({
                email: normalizedEmail,
                passwordHash: `GOOGLE_AUTH_${googleId}`
            });
            await user.save();
            console.log(`🆕 NOVÝ VELITEL PŘES GOOGLE: ${normalizedEmail}`);
        } else {
            console.log(`🔐 PŘIHLÁŠENÍ PŘES GOOGLE: ${normalizedEmail}`);
        }

        res.json({ success: true, email: normalizedEmail });
    } catch (error) {
        console.error('❌ Google Auth Error:', error);
        res.status(500).json({ error: 'Google authentication failed' });
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
