import unocssPlugin from 'unocss/vite'
import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
	plugins: [
		solid(),
		unocssPlugin({
			presets: [
				presetIcons({
					// options
					prefix: 'i-',
					extraProperties: {
						display: 'inline-block',
						'vertical-align': 'middle'
					}
				}),
				presetUno(),
				presetWebFonts({
					provider: 'google', // default provider
					fonts: {
						// these will extend the default theme
						/* sans: 'Roboto', */
						/* mono: ['Fira Code', 'Fira Mono:400,700'], */
						// custom ones
						poppins: 'Poppins:400'
						/* poppins: [
							{
								name: 'Poppins',
								weights: ['400', '700'],
								italic: true
							},
							{
								name: 'sans-serif',
								provider: 'none'
							}
						] */
					}
				})
			],

			shortcuts: [
				{
					'content-container': 'max-w-[1440px] w-full mx-auto px-8'
				}
			],
			rules: [
				[
					'sl-arrow',
					{
						[`--slidy-arrow-size`]: '80px',
						[`--slidy-arrow-color`]: 'white',
						[`--slidy-nav-item-size`]: '4px'
					}
				]
			]
		})
	]
})
