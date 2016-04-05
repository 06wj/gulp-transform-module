var utils = require('./utils');
var Bitmap = require('../hilo/view/Bitmap');
var ticker = require('../hilo/util/ticker');
var event = require('../hilo/event');
var config = require('../config');

/**
 * @module  act/game
 * @requires act/utils
 * @requires  hilo/view/Bitmap
 * @requires  hilo/util/ticker
 * @requires  hilo/event
 * @requires config
 */
var game = {
    init:function(){
        var bmp = new Bitmap();
        var ticker = new Ticker();
    }
};

module.exports = game;