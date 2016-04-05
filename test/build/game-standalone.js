(function(window){
var Hilo = window.Hilo;
var utils = Hilo.utils;
var Bitmap = Hilo.Bitmap;
var ticker = Hilo.ticker;
var event = Hilo.event;
var config = Hilo.config;
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
Hilo.game = game;
})(window);