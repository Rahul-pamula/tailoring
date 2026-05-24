# 🧵 Rajeshwari Tailoring Boutique

A premium, fully interactive web application for **Rajeshwari Tailoring**, a bespoke fashion boutique studio located in Maripeda Bangla, Mahabubabad, Telangana. 

This platform allows customers to browse custom-stitched catalog designs, submit visual reviews, and place customized orders directly via WhatsApp. It also features a mobile-friendly, secure administration dashboard for inventory and feedback management.

---

## 📸 Boutique Studio Preview

![Rajeshwari Tailoring Boutique Studio](/images/studio_preview.png)

---

## 🎨 Core Features

### 1. Premium Design Catalog
* **Non-Destructive Image Fitting**: All catalog photos automatically adapt using custom flex-contain wrappers. Landscape, portrait, and square images are displayed fully without cropping or distortion.
* **Touch-Swipe Image Gallery**: Product pages feature a touch-responsive carousel allowing mobile swipe gestures (left/right) to browse photos, custom navigation arrows, and selections.
* **Aspect Ratio Preservation**: Flexible cards replace generic hardcoded heights, ensuring cards remain visually uniform across screens.

### 2. Live Admin Control Panel
* **Designs Manager**: Create, edit, and delete catalog designs with custom categories (`Dress`, `Blouse`).
* **Image Processing Dashboard**: Rotate, zoom, and rearrange images visually before uploading.
* **Instant Deletions**: Deleting catalog items automatically cleans up both the PostgreSQL records and the associated files in the Supabase S3 Storage buckets.

### 3. Customer Reviews Moderation
* **Public Submission**: Customers can upload reviews and up to 2 image attachments directly.
* **Visual File Picker**: The review form shows actual image previews of the uploaded files with tap-to-remove actions.
* **Moderation Pipeline**: Reviews are inserted as pending (`is_approved: false`) and only appear on the public pages once approved in the Admin Dashboard.

### 4. Direct WhatsApp Integration
* **Instant Inquiries**: "Chat on WhatsApp" buttons automatically generate a customized greeting containing the design's unique ID (`RT100X`) to streamline sizing and ordering discussions.

---

## 🛠️ Technical Stack

* **Frontend Framework**: Next.js 16.2.6 (Turbopack)
* **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`) & Vanilla CSS
* **Database & Storage**: Supabase (PostgreSQL & S3-backed Storage)
* **Icons**: Lucide React
* **Deployment**: Docker & Docker Compose

---

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Local Development
Install dependencies and run the Next.js development server:
```bash
npm install
npm run dev
```
The application will run locally at [http://localhost:3000](http://localhost:3000).

### 3. Running with Docker
Build and spin up the Docker container:
```bash
docker-compose up --build
```
The Docker environment exposes the service on port `3001` [http://localhost:3001](http://localhost:3001).

---

## 🔐 Database & Storage Configuration

The schema and row-level security (RLS) rules are defined in [supabase/schema.sql](file:///Users/rahul/Desktop/tailoring/supabase/schema.sql).

### SQL Setup instructions:
Copy and execute the queries in your **Supabase Dashboard SQL Editor**:
1. **Tables Setup**: Creates `designs`, `reviews`, and `admins` tables.
2. **Open RLS Policies**: Configures public read/write capabilities on tables and buckets to avoid email confirmation blocks:
   * **`designs-images`** (Public Select/Delete, Admin Upload)
   * **`reviews-images`** (Public Select/Upload, Admin Delete)
