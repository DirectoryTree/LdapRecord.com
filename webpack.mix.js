let mix = require('laravel-mix');
let build = require('./tasks/build.js');
let tailwindcss = require('tailwindcss');

require('laravel-mix-purgecss');

mix.disableSuccessNotifications();
mix.setPublicPath('source/assets/build/');
mix.webpackConfig({
    plugins: [
        build.jigsaw,
        build.browserSync(),
        build.watch([
            'config.php',
            'source/**/*.md',
            'source/**/*.php',
            'source/**/*.scss',
            'versions/**/*.php',
        ]),
    ],
});

mix.js('source/_assets/js/app.js', 'js')
    .sass('source/_assets/sass/app.scss', 'css')
    .sourceMaps()
    .options({
        processCssUrls: false,
        postCss: [tailwindcss()],
    })
    .purgeCss({
        extensions: ['html', 'md', 'js', 'php', 'vue', 'blade'],
        folders: ['source'],
        whitelistPatterns: [/language/, /algolia/, /blockquote/],
    })
    .version();
