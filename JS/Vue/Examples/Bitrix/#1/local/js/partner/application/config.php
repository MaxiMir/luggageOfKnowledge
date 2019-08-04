<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => './dist/application.bundle.css',
	'js' => './dist/application.bundle.js',
	'rel' => [
		'main.polyfill.core',
		'ui.vue',
		'ui.vue.vuex',
	],
	'skip_core' => true,
];