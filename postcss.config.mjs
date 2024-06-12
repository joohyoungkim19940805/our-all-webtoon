import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNested from 'postcss-nested';
import postcssNestedAncestors from 'postcss-nested-ancestors';
import postcssReporter from 'postcss-reporter';
import postcssCssVariables from 'postcss-css-variables';
import postcssMixins from 'postcss-mixins';
import postcssCascabeLayers from '@csstools/postcss-cascade-layers';
import cssnano from 'cssnano';
import postcssFailOnWarn from 'postcss-fail-on-warn';
import stylelint from 'stylelint';

export default {
    plugins: [
        postcssFlexbugsFixes,
        postcssImport({
            plugins: [stylelint({ configFile: '.stylelintrc.js' })],
        }),
        postcssPresetEnv,
        postcssNested,
        postcssNestedAncestors,
        postcssReporter,
        postcssCssVariables,
        postcssMixins,
        postcssCascabeLayers,
        cssnano,
        postcssFailOnWarn,
    ],
};

// module.exports = {
// 	plugins: [
// 		require("postcss-flexbugs-fixes"),
// 		require('postcss-import')({
// 			plugins: [
// 				require('stylelint')({ configFile: '.stylelintrc.js' }),
// 			]
// 		}),
// 		require('postcss-preset-env')({ stage: 1 }),
// 		require('postcss-nested'),
// 		require('postcss-nested-ancestors'),
// 		require('postcss-reporter')({ clearReportedMessages: true }),
// 		require('postcss-css-variables')({preserve: true}),
// 		require('postcss-mixins'),
// 		require('@csstools/postcss-cascade-layers'),
// 		require('cssnano'),
// 		require("postcss-fail-on-warn"),
// 	],
// }
