window.docsearch = require('docsearch.js');

import Vue from 'vue';
import Prism from 'prismjs'
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-php';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

Prism.highlightAll();

window.$ = window.jQuery = require('jquery');
window.axios = require('axios');

Vue.component('navigation', require('./components/Navigation').default);
Vue.component('feature', require('./components/Feature').default);
Vue.component('feature-tab', require('./components/FeatureTab.vue').default);
Vue.component('feature-tab-header', require('./components/FeatureTabHeader.vue').default);

const app = new Vue({
    el: '#app',
});

$(document).ready(() => {
    // Wrap tables in content responsive container.
    $('.content > table').wrap($("<div />").addClass('my-2 border overflow-auto rounded-lg'));

    $('.content > pre[class*="language-"]').each((index, el) => {
        let language = el.classList[0].split('-')[1];

        if (['php', 'bash', 'html'].includes(language)) {
            $(
                `<div class="prism-show-language"><div class="prism-show-language-label" data-language="${language}">${language}</div></div>`
            ).insertBefore(el);
        }
    });
});
