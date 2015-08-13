/* JavaScript Boilerplate configuration file *
 * @version 1.2
 * GIT URL - https://github.com/mdarif/JavaScript-Boilerplate
 * Author - Mohammed Arif
 */

 /* Why do we need config?
  * All URLs needed by the JavaScript
  * Any strings that are displayed to the user
  * Any HTML that needs to be created from JavaScript
  * Settings (i.e., items per page)
  * Repeated unique values
  * Any value that may change in the future
  */

(function (AbilityLoft, $, undefined) {

	AbilityLoft.config = {
        debug : false,
        idFieldName : 'ID',
        titleFieldName : 'Titel',
        dependencyFieldName : 'ThematischeAbhängigkeit'
    };

/**
 * Check to evaluate whether 'AbilityLoft' exists in the global namespace - if not, assign window.AbilityLoft an object literal.
 */
}(window.AbilityLoft = window.AbilityLoft || {}, jQuery));
