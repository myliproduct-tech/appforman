import express from 'express';
import cors from 'cors';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// API Routes
// Get user stats
app.get('/api/stats/:email', async (req, res) => {
    try {
        const email = encodeURIComponent(req.params.email);
        const filePath = path.join(DATA_DIR, `${email}.json`);

        try {
            const data = await fs.readFile(filePath, 'utf8');
            res.json(JSON.parse(data));
        } catch (error) {
            // File doesn't exist - return null
            res.json(null);
        }
    } catch (error) {
        console.error('Error reading stats:', error);
        res.status(500).json({ error: 'Failed to read stats' });
    }
});

// Save user stats
app.post('/api/stats/:email', async (req, res) => {
    try {
        const email = encodeURIComponent(req.params.email);
        const filePath = path.join(DATA_DIR, `${email}.json`);
        const stats = req.body;

        await fs.writeFile(filePath, JSON.stringify(stats, null, 2));
        res.json({ success: true, message: 'Stats saved successfully' });
    } catch (error) {
        console.error('Error saving stats:', error);
        res.status(500).json({ error: 'Failed to save stats' });
    }
});

// Delete user data
app.delete('/api/stats/:email', async (req, res) => {
    try {
        const email = encodeURIComponent(req.params.email);
        const filePath = path.join(DATA_DIR, `${email}.json`);

        try {
            await fs.unlink(filePath);
            res.json({ success: true, message: 'Stats deleted successfully' });
        } catch (error) {
            res.json({ success: true, message: 'No data to delete' });
        }
    } catch (error) {
        console.error('Error deleting stats:', error);
        res.status(500).json({ error: 'Failed to delete stats' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from dist directory (production build)
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function startServer() {
    await ensureDataDir();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📡 API available at http://localhost:${PORT}/api`);
        console.log(`🌐 Frontend available at http://localhost:${PORT}`);
    });
}

startServer().catch(console.error);
