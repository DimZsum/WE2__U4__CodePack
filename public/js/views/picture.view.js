/**
 *  Backbone View (stub code) using the #xx-yy-zz-template from DOM to render ... into target element #xx-yy-target
 *  Needs model to be set from outside
 *
 *  !!(file can be deleted or changed for Ü4)!!
 *
 *  @author Johannes Konert
 *  @licence  MIT
 */
define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
    var result = {};
    var PictureView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#pictureView').text()),
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        }
    });
    result.view = PictureView;
    var PictureListView = Backbone.View.extend({
        el: '#picture-list',
        template: undefined,
        render: function() {
            this.$el.empty();
            this.collection.each(function(picture) {
                var pictureView = new PictureView({model: picture});
                this.$el.prepend(pictureView.render().el);
            }, this);
            return this;
        },
        initialize: function() {
            this.listenTo(this.collection,'add', this.render);
        }
    });
    result.listView = PictureListView;
    return result;
});