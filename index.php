<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Choco Haven - Chocolate Store</title>

    <link rel="icon" href="./images/website-logo.png" type="image/x-icon">
    <!-- Stylesheets -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/styles.css">
    
    <!-- Scripts -->
    <script src="bootstrap/js/bootstrap.min.js" defer></script>
    <script src="assets/script.js" defer></script>
</head>
<body id="home">
    <header>
        <?php 
            include_once('layout/header.php')
        ?>
    </header>

    <main class="container">
        <?php 
            include_once('pages/home.php')
        ?>
    </main>

    <footer>
        <?php 
            include_once('layout/footer.php')
        ?>
    </footer>
</body>
</html>