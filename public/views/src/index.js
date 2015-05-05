/**
Copyright (C) 2013 Moko365 Inc. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var Elements = require('../../elements/index');


/**
 * SETUP
 **/
var app = app || {};


/**
 * MODELS
 **/


app.MainCatagoryList = Backbone.Model.extend({
    url:'/1/productmaincategory',
    defaults: {
        success: false,
        errors: [],
        errfor: {},
        data:[
            {
                _id: '',
                mainCategoryTitle: 'mbed',
                subCategoryID: 'test'
              
            },
            {
                _id: '',
                mainCategoryTitle: 'Arduino',
                subCategoryID: 'test'
              
            }
        ]      
    }
});

app.MainCatagory = Backbone.Model.extend({
    url: function() {
        return '/1/productmaincategory' + this.attributes._id;
    },
    idAttribute: '_id',
    defaults: {
        success: false,
        errors: [],
        errfor: {},

        data: {
            _id: '',
            mainCategoryTitle: 'Arduino',
            subCategoryID: 'test' 
        }          
    }
});



app.NewsList = Backbone.Model.extend({
    url:'/1/channel',
    defaults: {
        success: false,
        errors: [],
        errfor: {},
        data:[
            {
                _id: '',
                date: '',
                group: 'test',
                subject: '',
                username: '',
                youtubeId: 'zpOULjyy-n8'
            },
            {
                _id: '',
                date: '',
                group: 'test',
                subject: '',
                username: '',
                youtubeId: 'youTubeId'
            }
        ]      
    }
});

app.News = Backbone.Model.extend({
    url: function() {
        return '/1/channel' + this.attributes._id;
    },
    idAttribute: '_id',
    defaults: {
        success: false,
        errors: [],
        errfor: {},

        data: {
            _id: '',
            date: '',
            group: 'test',
            subject: '',
            username: '',
            youtubeId: 'youTubeId'  
        }          
    }
});


app.MainCatagoryCollection = Backbone.Collection.extend({  
    model: app.MainCatagory    
}); 

app.NewsCollection = Backbone.Collection.extend({  
    model: app.News    
});


/**
 * VIEWS
 **/
app.MainCatagory = Backbone.View.extend({
    el: '#channel-list',
    template: _.template( $('#tmpl-channel-item').html() ),
    events: { // 符合 MVVM, Users 跟 View 互動
        'click .btn-success': 'handleClick'
    },
    initialize: function() {
        this.model = new app.MainCatagoryList();
        this.listenTo(this.model, 'sync', this.render);
        this.widget = new Elements.ProductCatagory({
            el: this.$el,
            model: app.MainCatagoryList,
            collection: app.MainCatagoryCollection,
            template: this.template
            
        });

        this.model.fetch();
    },
    handleClick: function(ev) {
        //Facade pattern
        // event.preventDefault();
        // alert('OK');
        event.preventDefault();
        var elm = this.$el.find(ev.currentTarget);
     //   var id = elm.data(c);
        console.log(elm );
        alert( 'ok');
    },
    render: function() {
        var data = this.model.get('data');
        var self = this;

        data.forEach(function (el, idx) {
            self.widget.addWidget({
                mainCategoryTitle: el.mainCategoryTitle, 
                subCategoryID: el.subCategoryID
            });
        });
    }
});


app.SpotNews = Backbone.View.extend({
    el: '#channel-list',
    template: _.template( $('#tmpl-channel-item').html() ),
    events: { // 符合 MVVM, Users 跟 View 互動
        'click .btn-success': 'handleClick'
    },
    initialize: function() {
        this.model = new app.NewsList();
        this.listenTo(this.model, 'sync', this.render);
        this.widget = new Elements.YoutubeChannel({
            el: this.$el,
            model: app.News,
            collection: app.NewsCollection,
            template: this.template
            
        });

        this.model.fetch();
    },
    handleClick: function(ev) {
        //Facade pattern
        // event.preventDefault();
        // alert('OK');
        event.preventDefault();
        var elm = this.$el.find(ev.currentTarget);
     //   var id = elm.data(c);
        console.log(elm );
        alert( 'ok');
    },
    render: function() {
        var data = this.model.get('data');
        var self = this;

        data.forEach(function (el, idx) {
            self.widget.addWidget({
                title: el.youtubeId, 
                href: el.youtubeId,
                img: el.youtubeId,
                youtubeId: el.youtubeId,
                group: el.group
            });
        });
    }
});
/**
 * BOOTUP
 **/

$(document).ready(function() {
    //app.newsView = new app.SpotNews();
    app.MainCatagory = new app.MainCatagory();
});


/**
 * 
 **/

$(document).ready(function() {
    $('#list').click(function(event){
        event.preventDefault();
        $('#products.item').addClass('list-group-item');});

    $('#grid').click(function(event){
        event.preventDefault();
        $('#products.item').removeClass('list-group-item');
        $('#products.item').addClass('grid-group-item');});
});