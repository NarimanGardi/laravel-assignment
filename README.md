# Laravel Assignment

## Dependencies

-   PHP >= 8.3
-   Laravel/Framework >= 11.0
-   Node >= 20.18.1

## Installation
* Install PHP and Composer on your local or production server:
    - PHP Installation: <a href="https://www.php.net/downloads.php">`https://www.php.net/downloads.php`</a>
    - Composer Installation: <a href="https://getcomposer.org/">`https://getcomposer.org/`</a>
    
* Install the dependencies: 
    ```
    composer install
    npm install
    ```
    
* Create a new `.env` file by copying the `.env.example` file: 
    ```
    cp .env.example .env
    ```
    
*  Update the `DB_` variables in the `.env` file with your database credentials.
    
* Generate a new application key: 
    ```
    php artisan key:generate
    ```

* Link storage folder to public: 
    ```
    php artisan storage:link
    ```
    
*  Migrate the database: 
    ```
    php artisan migrate
    ```
    
*  Serve the application: 
    ```
    npm run dev
    php artisan serve