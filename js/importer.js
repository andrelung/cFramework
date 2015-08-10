/*global AbilityLoft, sheetrock */

/* JavaScript Boilerplate main scripting file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */

/* importer (function namespace name) and undefined are passed here
 * to ensure 1. namespace can be modified locally and isn't
 * overwritten outside of our function context
 * 2. the value of undefined is guaranteed as being truly
 * undefined. This is to avoid issues with undefined being
 * mutable pre-ES5.
 */

(function (importer, $, undefined) {
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
 *  importer.title = 'Interactive Developer';
 *  importer.sayHello = function() {
 *      return "Hello World!";
 *  };
 */
    importer.loadData = function(sourceUrl, callback) {
        function rawDataObject() {
        }
        var responseObj = new rawDataObject();
        responseObj.requestUrl  = sourceUrl;
        responseObj.requestTime = Date.now();


        if (sourceUrl.search("docs.google.com/spreadsheets/") > 0) { //sheetrock logic
            var setData = function(error, options, response) {
                var i;
                if (!error) {
                    responseObj.answerTime  = Date.now();
                    responseObj.header      = response.rows[0].labels;
                    responseObj.rows        = [];
                    for (i = 1; i < response.rows.length; i++) { //start with 1 to skip header

                        responseObj.rows.push({
                            id: response.rows[i].cells[AbilityLoft.config.iDFieldName],
                            title: response.rows[i].cells[AbilityLoft.config.titleFieldName],
                            dependencies: response.rows[i].cells[AbilityLoft.config.dependencyFieldName].split(";")
                        });
                    }
                    if (callback && typeof(callback) === "function") {
                        callback(responseObj); //call external
                    }
                } else {
                    console.error("Error while retrieving data: " + error);
                    return;
                }
            };

            sheetrock({
                url: sourceUrl,
                query: "select A, B, F", //A=ID, B=Titel, F=Abhängigkeit
                //query: "select A,B,C,D,E,L where E = 'Both' order by L desc"
                callback: setData
            });

//      } else if  { //other sourceUrl provider
        } else {
            console.error("no valid importer found for given url: " + sourceUrl);
        }
        //if (extCallback && typeof(extCallback) === "function") {
        //  extCallback();
        //}
    };


/*
 * Singletons serve as a namespace provider which isolate implementation code
 * from the global namespace so as to provide a single point of access for functions,
 * this is useful for organizing code into logical sections.
 * It is possible to put parentheses around this structure to instantiate it immediately after it's parsed.
 * This way it's always present when the script is executed and doesn't have to be instantiated separately.
 */
    importer.subHelper = (function() {
        function _subHelper() {

            /**
             * In non-strict mode, 'this' is bound to the global scope when it isn't bound to anything else.
             * In strict mode it is 'undefined'. That makes it an error to use it outside of a method.
             */
            /*jshint validthis: true */

        /*
         * Sub-Functions, call with "importer.subHelper.function()" eg.
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
                return this; /*this refers to importer.subHelper*/
            };
            return this.init(); /*initialize the init()*/
        }
        return new _subHelper(); /*creating a new object of subHelper rather then a funtion*/
    }());

/**
 * Check to evaluate whether 'importer' exists in the global namespace - if not, assign window.importer an object literal
 */
}(window.importer = window.importer || {}, jQuery));
