# GoCycle

Platform edukasi showcase untuk produk daur ulang dan tutorial DIY ramah lingkungan. Menampilkan karya eco-makers Indonesia dengan storytelling yang menginspirasi dan impact metrics yang terukur.

## Overview

GoCycle adalah platform showcase yang menghubungkan eco-makers dengan komunitas untuk berbagi inspirasi, tutorial, dan dampak positif dari daur ulang sampah. Platform ini fokus pada edukasi dan awareness, bukan transaksi komersial.

### Key Features

- **Product Showcase**: Galeri produk daur ulang dengan cerita di balik setiap karya
- **DIY Tutorials**: Panduan step-by-step membuat produk dari sampah
- **Impact Metrics**: Real-time statistics dampak lingkungan (CO2, waste saved)
- **Waste Journey**: Simulasi interaktif lifecycle sampah (recycle vs dispose)
- **Eco Makers**: Profil pembuat karya dan studio mereka

## Tech Stack

### Backend
- Node.js + TypeScript
- Express.js
- PostgreSQL (Supabase)
- TypeORM
- Redis (optional caching)
- Clean Architecture

### Frontend
- NextJS + TypeScript
- TailwindCSS
- React Router

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or Supabase account)
- Redis (optional)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run build

# Seed database with dummy data
npm run seed

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

### Product Categories

HOME_DECOR, FASHION, FURNITURE, ACCESSORIES, TOYS, STORAGE, GARDEN, LIGHTING

### Waste Types

PLASTIC, GLASS, METAL, CARDBOARD, TEXTILE, ORGANIC, ELECTRONIC

---

Built with passion for sustainability and education.
