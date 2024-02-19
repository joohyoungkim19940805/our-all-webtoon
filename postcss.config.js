module.exports = {
	plugins: [
		[
		  'postcss-preset-env',
		  {
			browsers: '> 5% in KR, defaults, not IE < 11',
			// CSS Grid 활성화 [false, 'autoplace', 'no-autoplace']
			autoprefixer: { grid: 'autoplace' },
		  },
		],
		[
			'postcss-short', 
			{
				prefix: 'x', skip: '-' 
			}
		],
		require('postcss-import'),
        require('postcss-mixins'),
        require("stylelint"),
        require('postcss-preset-env')({ stage: 1 }),
        require('cssnano'),
	  ],
  }