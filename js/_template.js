/*global AbilityLoft */

/* JavaScript Boilerplate main scripting file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */


/* parser (function namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */

(function (parser, $, undefined) {
    'use strict';

/**
 * Logging function, for debugging mode
 */
    $.log = function (message) {
        if (AbilityLoft.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        }
        /*else {
            alert(message);
        }*/
    };




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


/**
 * Public methods and properties, e.g.
 *  parser.title = 'Interactive Developer';
 *  parser.sayHello = function() {
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
    parser.subHelper = (function() {
        function _subHelper() {

            /**
             * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
             * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
             */
            /*jshint validthis: true */

        /*
         * Sub-Functions, call with "parser.subHelper.function()" eg.
         *  this.shout = function (example) {
         *      return example.toUpperCase();
         *  };
        */


            /**
             * Initialize the object
             */
            this.init = function() {
                //do everything which needs to be done for init, eg
                //_this.getDomain();
                return this; /*this refers to parser.subHelper*/
            };
            return this.init(); /*initialize the init()*/
        }
        return new _subHelper(); /*creating a new object of subHelper rather then a funtion*/
    }());

/**
 * Check to evaluate whether 'parser' exists in the global namespace - if not, assign window.parser an object literal
 */
}(window.parser = window.parser || {}, jQuery));
