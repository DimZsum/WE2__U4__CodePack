/**
 *  Backbone Model (stub)
 *  Connected to REST API /{ressourcepath}
 *
 *  !!(file can be deleted or used for Ü4)!!
 *
 *  @author Johannes Konert
 *  @licence  MIT
 */
define(['backbone', 'underscore'], function(Backbone, _) {
    var result = {};

    var PictureModel = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            width: 0,
            height: 0,
            src: '',
            title: '',
            description: '',
            views: 0,
            timestamp: ''
        },
        initialize: function() {

        },
        validate: function(attr) {
            if(!attr._id){
                return "no Id";
            }
        }
    });
    result.Model = new PictureModel();
    var PictureCollection = Backbone.Collection.extend({
        model: PictureModel,
        url: 'http://localhost:3000/pictures/',
        initialize: function() {
        }
    });
    result.Collection = new PictureCollection();
    return result;
});