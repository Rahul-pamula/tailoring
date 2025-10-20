# Rajeshwari Couture

A modern tailoring website showcasing custom designs, customer reviews, and contact functionality. Built with a Django backend for content management and a React frontend for an interactive user experience.

<Features>

  <Design Gallery>: Browse and search custom tailoring designs with unique design numbers
- **Customer Reviews**: View approved customer testimonials with optional images
- **Contact Form**: Easy way for customers to get in touch
- **Admin Panel**: Django admin interface for managing designs, reviews, and contacts
- **Image Management**: Cloudinary integration for efficient image storage and delivery
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

<Tech Stack> 

### Backend
  <Django 5.1.4>: Web framework
- **SQLite**: Database (configurable for production)
- **Cloudinary**: Image storage and management
- **WhiteNoise**: Static file serving
- **Gunicorn**: WSGI server for deployment

### Frontend
  <React>: UI library
  <TypeScript>: Type-safe JavaScript
  <Vite>: Build tool and development server
  <Tailwind CSS>: Utility-first CSS framework
  <shadcn/ui>: Component library

### Installation

### Prerequisites
- Python 3.8+
- Node.js & npm
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tailoring
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the root directory with:
```
DEBUG=True
SECRET_KEY=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Collect static files:
```bash
python manage.py collectstatic --noinput
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd rajeshwari-couture-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Usage

### Running the Backend
```bash
python manage.py runserver
```
The Django server will start at `http://127.0.0.1:8000`

### Running the Frontend
```bash
cd rajeshwari-couture-site
npm run dev
```
The React app will start at `http://localhost:5173`

### Admin Panel
Access the Django admin at `http://127.0.0.1:8000/admin/` to manage:
- Designs (add design numbers, names, prices, images)
- Reviews (approve/reject customer reviews)
- Contacts (view customer inquiries)

### Deployment

This project is configured for deployment on Render:

1. Connect your GitHub repository to Render
2. Use the `render.yaml` configuration for automatic deployment
3. Set environment variables in Render dashboard:
   - `DEBUG=False`
   - `SECRET_KEY`
   - Cloudinary credentials
   - `DATABASE_URL` (if using PostgreSQL)

### Project Structure

```
tailoring/
├── shop/                    # Django app
│   ├── models.py           # Database models (Design, Review, Contact)
│   ├── views.py            # View functions
│   ├── templates/          # HTML templates
│   └── static/             # CSS, JS, images
├── tailoring/              # Django project settings
├── rajeshwari-couture-site/ # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   └── assets/         # Static assets
│   └── public/             # Public files
├── media/                  # User-uploaded files
├── static/                 # Static files
└── staticfiles/            # Collected static files
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
