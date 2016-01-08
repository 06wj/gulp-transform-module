define('act/game', ['hilo/view/Bitmap', 'hilo/util/ticker', 'hilo/event'], function(Bitmap, ticker, event){

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