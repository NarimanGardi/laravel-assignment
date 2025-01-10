<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Default Title')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <div class="container mt-5">
        <header>
            <h1 class="text-center">@yield('header', 'Assginement')</h1>
        </header>
        <main>
            @yield('content')
        </main>
    </div>
</body>

</html>