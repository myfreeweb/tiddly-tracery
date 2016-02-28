/*\
title: $:/plugins/myfreeweb/tiddly-tracery/tracery-generate.js
type: application/javascript
module-type: macro

Macro to generate a text using Tracery on a grammar from a specified JSON tiddler.

\*/
/** @license Unlicense
 */
(function(){
	'use strict'

	var tracery = require('$:/plugins/myfreeweb/tiddly-tracery/tracery.js')

	exports.name = 'tracery-generate'

	exports.params = [
		{ name: 'grammar' },
		{ name: 'expr' }
	]

	exports.run = function (grammar, expr) {
		var tiddler = this.wiki.getTiddler(grammar)
		if (!tiddler)
			return 'Tiddler not found: "' + grammar + '" :-('

		var jsongrammar = {}
		try { jsongrammar = JSON.parse(tiddler.fields.text) }
		catch (e) { return 'Could not parse JSON in tiddler "' + grammar + '": ' + e }

		var tr = tracery.createGrammar(jsongrammar)
		tr.addModifiers(tracery.baseEngModifiers)
		return tr.flatten(expr)
	}

})()
