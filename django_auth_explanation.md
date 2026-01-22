# How Django Admin Authentication Works

The Django Admin panel comes with a robust, built-in authentication system. Here is how it keeps your tailoring shop secure.

## 1. Accessing the Login
- **URL**: By default, the login page is found at `/admin/login/`.
- **Button**: The button we added links directly to this URL.

## 2. User Authentication
Django uses a session-based authentication system backed by the database.
- **Credentials**: When you enter your username and password, Django hashes the password (using secure algorithms like PBKDF2) and compares it with the stored hash in the `auth_user` table.
- **Session**: If valid, Django creates a session ID, stores it in a secure cookie on your browser, and records it in the `django_session` table.

## 3. Role-Based Access Control (RBAC)
Not all users can access the admin panel. Django checks two flags:
- **`is_staff`**: Must be `True` to view the admin interface at all.
- **`is_superuser`**: Has full permissions to everything.
- **Permissions**: You can assign specific permissions (e.g., "Can add Design", but "Cannot delete Review") to specific users or groups.

## 4. Security Advantages
- **CSRF Protection**: Prevents malicious sites from submitting forms on your behalf.
- **Encrypted Passwords**: Passwords are never stored in plain text.
- **Brute Force Protection**: While basic, Django's auth system can be extended with rate limiting (like `django-axes`) to prevent password guessing.
- **HTTPS Usage**: When deployed with SSL (which Supabase/Vercel provide), credentials are encrypted in transit.

## Usage
Simply click the **Admin Login** button, enter the superuser credentials you created (username: `admin`), and you will have full control to manage designs and reviews.
