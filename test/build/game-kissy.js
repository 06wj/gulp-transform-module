KISSY.add('act/game', function(S, utils, Bitmap, ticker, event, config){

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

return game;

}, {
    requires: ['act/utils', 'hilo/view/Bitmap', 'hilo/util/ticker', 'hilo/event', 'config']
});