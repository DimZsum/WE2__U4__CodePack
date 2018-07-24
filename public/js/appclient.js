/** Main application file to start the client side single page app (only a stub for Ü4)
 *
 * @author Johannes Konert
 * @licence  MIT
 */

requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: '_lib/jquery-1.11.3',
        underscore: '_lib/underscore-1.8.3',
        backbone: '_lib/backbone-1.2.3'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

// AMD conform require as provided by require.js
require(['jquery','backbone'],
        function($, Backbone) {

    // TODO your first code steps here
    console.log("JavaScript is running!");
    // see this console.log in Browser window (developer console, F12)





    // finally start tracking URLs to make it a SinglePageApp (not really needed at the moment)
    Backbone.history.start({pushState: true}); // use new fancy URL Route mapping without #
});
