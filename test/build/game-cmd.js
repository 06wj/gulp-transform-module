define(function(require, exports, module){

var Bitmap = require('hilo/view/Bitmap');
var ticker = require('hilo/util/ticker');
var event = require('hilo/event');

/**
 * @module  act/game
 * @requires  hilo/view/Bitmap
 * @requires  hilo/util/ticker
 * @requires  hilo/event
 */
var game = {
    init:function(){
        var bmp = new Bitmap();
        var ticker = new Ticker();
    }
};

return game;

});