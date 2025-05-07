cd backend
composer install
php artisan migrate
php -S localhost:8000 -t public

cd ../frontend
npm install
npm run dev
