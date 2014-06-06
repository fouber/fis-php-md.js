//require a module 
var bar = require('./bar.js');

module.exports = function(selector, color){
    bar(selector).css('color', color);
};