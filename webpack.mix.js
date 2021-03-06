const mix = require('laravel-mix');
require('laravel-mix-jigsaw');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build');

mix.js('source/_assets/js/main.js', 'js')
    .sass('source/_assets/sass/main.scss', 'css/main.css')
    .jigsaw({
        watch: [
            'app/**',
            'config.php',
            'versions.php',
            'source/**/*.md',
            'source/**/*.php',
            'source/**/*.scss',
            'versions/**/*.php',
        ],
    })
    .options({
        processCssUrls: false,
        postCss: [
            require('postcss-css-variables')(),
            require('tailwindcss'),
        ],
    })
    .sourceMaps()
    .version();