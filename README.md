# Partner v Akci - Deployment na Render.com

## 🚀 Backend Server

Kombinovaný Express server poskytující:
- **API** pro ukládání/načítání user dat
- **Static hosting** pro React aplikaci

### API Endpoints

#### `GET /api/stats/:email`
Načte uživatelská data podle emailu.

**Response:** JSON s user stats nebo `null` pokud neexistují

#### `POST /api/stats/:email`
Uloží uživatelská data.

**Body:** JSON object s user stats

#### `DELETE /api/stats/:email`
Smaže uživatelská data.

#### `GET /api/health`
Health check endpoint pro monitoring.

---

## 📦 Deployment na Render.com

### Nastavení (už máš hotové):
- **Repository:** https://github.com/myliproduct-tech/appforman
- **Branch:** main
- **Build Command:** `npm install && npm run build`
- **Start Command:** `node server.js`
- **Node Version:** 18+ (doporučeno)

### Environment Variables (volitelné):
- `PORT` - Render.com nastaví automaticky

---

## 🛠️ Lokální Vývoj

```bash
# Install dependencies
npm install

# Dev mode (frontend only)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Struktura

```
/
├── server.js          # Express server (API + static hosting)
├── dist/              # Production build (vytvořeno 'npm run build')
├── data/              # User data storage (ne v gitu)
├── public/            # Static assets (ikony, zvuky)
└── components/        # React komponenty
```

---

## ⚠️ Poznámky

- User data jsou uložena v `/data` složce (filesystem)
- Pro produkci doporučuji přidat databázi (MongoDB, PostgreSQL)
- CORS je povolený pro všechny origins (upravit pro produkci)
