/* JavaScript Boilerplate helper file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */

(function (JSB, $, undefined) {
    'use strict';

    /*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
    */
    JSB.helper = (function () {
        function _helper() {

            /**
            * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
            * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
            */

            /*jshint validthis: true */
            var _this = this,

            /*
             * This method return the element using javaScript getElementById() method.
             * This is the private method not meant for use as a public method.
            */
            id = function (el) {
                return document.getElementById(el);
            };





            this.init = function () {
                return this; /*returning this from a method is a common way to allow "chaining" of methods together*/
            };

            return this.init(); /*this refer to JSB.helper.init()*/
        }

        return new _helper(); /*creating a new object of helper rather then a funtion*/
    }());

/**
 * Check to evaluate whether 'JSB' exists in the global namespace - if not, assign window.JSB an object literal
 */
}(window.JSB = window.JSB || {}, jQuery));
