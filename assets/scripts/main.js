//models
window.Comment = Backbone.Model.extend({
    urlRoot:"/comments",
    defaults:{
        "id":null,
        "scoredetails":"",
        "author":"",
        "date":"",
        "message":"",
    }
});

//collection
window.CommentCollection = Backbone.Collection.extend({
    model:Comment,
	url: 'http://localhost:9090/commenting-system',
});


//view
window.CommentView = Backbone.View.extend({

    template:_.template($('#comment-template').html()),

    initialize:function () {
        this.model.bind("change", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events:{
        "click .upvote":"upvoteComment",
        "click .delete":"deleteComment"
    },

/*	
    change:function (event) {
        var target = event.target;
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
        // You could change your model on the spot, like this:
        // var change = {};
        // change[target.name] = target.value;
        // this.model.set(change);
    },
*/
    upvoteComment:function () {
        this.model.set({
            scoredetails:$('#upvote').val(),
            date:$('#time_elapsed').val(),
            message:$('#message').val(),
        });
        if (this.model.isNew()) {
            var self = this;
            app.commentList.create(this.model, {
                success:function () {
                    app.navigate('comments/' + self.model.id, false);
                }
            });
        } else {
            this.model.save();
        }

        return false;
    },

    deleteComment:function () {
        this.model.destroy({
            success:function () {
                alert('Comment deleted successfully');
                window.history.back();
            }
        });
        return false;
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }
});



