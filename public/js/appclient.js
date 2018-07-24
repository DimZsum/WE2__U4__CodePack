"use strict";
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
require(['jquery', 'backbone', 'models/picture.model', 'views/picture.view'],
    function ($, Backbone, model, view) {

        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'defaultPath'
            },
            defaultPath: function (path) {
                $('body').prepend('<h1>Bildergalerie App</h1>');
                // model.Collection.fetch({
                //     success: function () {
                //         var picView = new view({model: model.Collection.at(0)});
                //         $('#pics').append(picView.render().el);
                //     },
                //     error: function (err) {
                //         console.log(err.message);
                //
                //     }
                // });

                var pictures = new view.listView({collection: model.Collection});
                console.log(pictures);
                model.Collection.fetch({
                    success: function () {
                        pictures.render()
                    },
                    error: function (err) {
                        console.log(err.message);
                    }
                });

            }
        });
        var myAppRouter = new AppRouter();


        // finally start tracking URLs to make it a SinglePageApp (not really needed at the moment)
        Backbone.history.start({pushState: true}); // use new fancy URL Route mapping without #
    });
