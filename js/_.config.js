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

(function (JSB, $, undefined) {

	JSB.config = {
		language: 'english',
        debug: true,
		appId: '150352665021939',
		urls : {
			"404" : "404.html",
			"500" : "500.html",
			homepage : 'index.html'
		}
	};

/**
 * Check to evaluate whether 'JSB' exists in the global namespace - if not, assign window.JSB an object literal.
 */
}(window.JSB = window.JSB || {}, jQuery));
