/**
 * Modules
 */
//var $ = require('jquery');
//var _ = require('underscore');
//var Backbone = require('backbone');
//Backbone.$ = $;

/**
 * Benchmark
 */
//var Benchmark = require('benchmark');
//var suite = new Benchmark.Suite;

/**
 * Element Class (ViewModel)
 */
var ElementSpotNews = require('./src/elementSpotNews');
var ElementSpotIntro = require('./src/elementSpotIntro');
var ElementYoutubeChannel = require('./src/elementYoutubeChannel');
var ElementProductCatagory = require('./src/elementProductCatagory');


/**
 * Module
 */
module.exports = {
    SpotNews: ElementSpotNews,
    SpotIntro: ElementSpotIntro,
    YoutubeChannel: ElementYoutubeChannel,
    ProductCatagory: ElementProductCatagory
};
