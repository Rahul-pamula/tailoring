# Project Modifications TODO

## Completed Tasks
- [x] Add design_number field to Design model (unique integer)
- [x] Update designs view to handle search by design_number or name
- [x] Add admin link beside contact in base.html navigation
- [x] Update designs.html to extend base.html, add search form, display design_number
- [x] Update contact.html to extend base.html, improve styling with card layout
- [x] Run makemigrations and migrate for new field
- [x] Verify image upload form has enctype (reviews.html already has it)

## Followup Steps
- [ ] Test the application locally: python manage.py runserver
- [ ] Check image uploads in reviews (ensure Cloudinary env vars are set)
- [ ] Assign design_numbers to existing designs in admin
- [ ] Improve overall UI styling in styles.css if needed
- [ ] Verify search functionality works
