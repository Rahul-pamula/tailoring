# Supabase PostgreSQL Setup Guide

## 1. Get Connection String
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. Go to **Settings** -> **Database**.
4. Under **Connection string**, make sure **URI** is selected.
5. Copy the connection string. It will look like:
   `postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres`

## 2. Configure Environment
Create a `.env` file in `backend/` directory:

```bash
DATABASE_URL=postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres
```

## 3. Run Migrations
Apply the database schema to Supabase:

```bash
cd backend
python manage.py migrate
```

## 4. Verify Connection
Create a superuser to access the admin panel:

```bash
python manage.py createsuperuser
```

## Troubleshooting
- **Connection Refused**: Ensure your IP is allowed in Supabase (check "Network Restrictions" in settings).
- **Transaction Pooling**: Supabase uses built-in pooling (PgBouncer). Using port `6543` enables transaction pooling, which is recommended for serverless setups but `5432` is fine for persistent servers.
- **SSL**: `dj_database_url` handles SSL automatically.
