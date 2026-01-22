from django.contrib.auth import get_user_model
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

User = get_user_model()

# EDIT HERE: Add your desired admin credentials
admins = [
    {'username': 'admin1', 'email': 'admin1@example.com', 'password': 'password123'},
    {'username': 'admin2', 'email': 'admin2@example.com', 'password': 'password123'},
    {'username': 'admin3', 'email': 'admin3@example.com', 'password': 'password123'},
]

for admin in admins:
    if not User.objects.filter(username=admin['username']).exists():
        User.objects.create_superuser(admin['username'], admin['email'], admin['password'])
        print(f"Superuser '{admin['username']}' created.")
    else:
        print(f"Superuser '{admin['username']}' already exists.")
