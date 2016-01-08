(function(window){
var Hilo = window.Hilo;
var Bitmap = Hilo.Bitmap;
var ticker = Hilo.ticker;
var event = Hilo.event;
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
Hilo.game = game;
})(window);