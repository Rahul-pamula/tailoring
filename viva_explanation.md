# Tailoring Shop Project - Viva Explanation

## 1. Single Admin & Hidden User Management
**Q: How is the admin panel customized for a single user/business owner?**
**A:** 
- **Hidden Models**: We modified `admin.py` to unregister (`admin.site.unregister`) the default `User` and `Group` models. This simplifies the dashboard so the owner only sees "Designs" and "Reviews".
- **Single Admin**: Since this is a small business application, we only need one Superuser. We don't need complex user management or groups in the UI, keeping it clean and focused on the business logic.

## 2. Admin Login & Logout
**Q: How does the Login/Logout functionality work?**
**A:**
- **Login**: We use Django's built-in secure authentication system. The "Admin Login" button redirects to `/admin/login/`.
- **Logout**: We implemented a `Logout` button that links to Django's `LogoutView`. It securely destroys the session cookie (`sessionid`) and redirects the user back to the homepage (`next_page='/'`).
- **Conditional UI**: The templates check `{% if user.is_authenticated %}`. If logged in, it shows "Logout"; otherwise, "Admin Login".

## 3. Internationalization (i18n) - English & Telugu
**Q: How did you implement Multi-Language Support?**
**A:** I used Django's built-in Internationalization framework.
1.  **Configuration**: Enabled `LocaleMiddleware` in `settings.py` and defined languages (`en`, `te`).
2.  **Marking Strings**: Used the `{% trans "Text" %}` template tag to mark all user-facing text for translation.
3.  **Translation Files**: Ran `django-admin makemessages -l te` to generate a `.po` file, where we mapped English phrases to Telugu phrases (e.g., "Our Designs" -> "మా డిజైన్లు").
4.  **Compilation**: Ran `django-admin compilemessages` to convert the `.po` file into a binary `.mo` file that Django reads for fast translation.
5.  **Switching**: The Language Switcher form POSTs to `{% url 'set_language' %}`, which sets a `django_language` cookie to persist the preference.
