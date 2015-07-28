/* JavaScript Boilerplate main scripting file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */

/* gsheets (our namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */

(function(gsheets, $, undefined) {
    'use strict';

    /**
     * Logging function, for debugging mode
     */
    $.log = function(message) {
        if (gsheets.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        }
        /*else {
            alert(message);
        }*/
    };

    /**
     * Angus Croll awesome typeof fix from http://goo.gl/GtvsU
     *  $.toType(window); //'global' (all browsers)
     *  $.toType([1,2,3]); //'array' (all browsers)
     *  $.toType(/a-z/); //'regexp' (all browsers)
	 *  $.toType(JSON); //'json' (all browsers)
     *  $.toType(null); //'null' (all browsers)
     *  $.toType(undefined); //'undefined' (all browsers)
     */
    $.toType = (function toType(global) {
        return function(obj) {
            if (obj === global) {
                return 'global';
            }
            return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
        };
    }(this));

    /**
     * Private properties, eg.
     *  var name = 'bla',
     *      age = 30;
     */

    /**
     * Private methods, e.g.
     *  var getName = function() {
     *      return 'My name is ' + name + ', I am ' + age + ' old.';
     *  };
     */
    /*




    /**
     * Public methods and properties, e.g.
     *  gsheets.title = 'Interactive Developer';
     *  gsheets.sayHello = function() {
     *      return "Hello World!";
     *  };
     */


    /*
     * Singletons serve as a namespace provider which isolate implementation code
     * from the global namespace so as to provide a single point of access for functions,
     * this is useful for organizing code into logical sections.
     * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
     * This way it's always present when the script is executed and doesn't have to be instantiated separately.
     */
    gsheets.subHelper = (function() {
        function _subHelper() {

            /**
             * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
             * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
             */

            /*jshint validthis: true */
            var _this = this;
            /* Store this to avoid scope conflicts */

            /*
             * Return the URI of site
             * Return protocol, hostname and port if found
             *
            */
            this.getDomain = function () {
                var port = "",
                    url = "";

                if (window.location.port) {
                    port = ":" + window.location.port;
                }
                url = window.location.protocol + "//" + window.location.hostname + port + "/";
                return url;
            };


            /*
             * Sub-Functions, call with "gsheets.subHelper.function()" eg.
             *  this.shout = function (example) {
             *      return example.toUpperCase();
             *  };
            */


            /**
             * Init
             */
            this.init = function() {
                _this.getDomain();
                return this; /*this refer to gsheets.subHelper*/
            };

            return this.init(); /*initialize the init()*/
        }
        return new _subHelper(); /*creating a new object of subHelper rather then a funtion*/
    }());

    /**
     * Check to evaluate whether 'gsheets' exists in the global namespace - if not, assign window.gsheets an object literal
     */
}(window.gsheets = window.gsheets || {}, jQuery));
