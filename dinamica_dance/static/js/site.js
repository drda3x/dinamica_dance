(function() {
    'use strict';

    /**
     * 1. Сделать логику отображения окна с подробностями
     * 2. Перенести сюда все остальное
     */

    function Teacher(data) {
        this.name = '';
        this.surname = '';
        this.about = '';
        this.photo = '';
        this.video = '';
    }

    Teacher.prototype.showPhoto = function() {
        if(this.photo instanceof String) {
            this.photo = $(
                '<img src="'+this.photo+'" />'
            )
            .hide()
            .appendTo(adasdffd);
        }

        this.photo.show();
    }

    Teacher.prototype.hidePhoto = Teacher.photo.hide;

    Teacher.prototype.showVideo = function() {
        if(this.video instanceof String) {
            this.video = $(
                '<iframe width="560" height="349" src="'+this.video+'" frameborder="0" allowfullscreen></iframe>'
            )
            .hide()
            .appendTo(adfasjdfi);
        }

        this.video.hide();
    }

    Teacher.prototype.hideVideo = Teacher.video.hide;
    
    function Group() {
        this.name = '';
        this.days = '';
        this.banner = '';
        this.time = '';
        this.place = '';
        this.passes = '';
        this.about1 = '';
        this.about2 = '';
        this.teachers = '';
    }
    
    Group.prototype.hide = function() {
        for(var i=this.teachers.length-1; i>=0; i--) {
           this.teachers[i].hidePhoto();
           this.teachers[i].hideVideo();
        } 

        this.place.hidePhoto();
    }

    Group.prototype.show = function() {
        for(var i=this.teachers.length-1; i>=0; i--) {
           this.teachers[i].showPhoto();
           this.teachers[i].showVideo();
        } 
        this.place.showPhoto();
    }

    function Widget() {
        this.group = null;
        this.allGroups = {};
    } 

    Widget.prototype.fill = function(newGroup) {
        this.group.hide();
        this.group = this.allGroups[newGroup];
        this.group.show();
    }

    Widget.prototype.init = function(data) {
    
    }
    
    window.widget = Widget;
});
