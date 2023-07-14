import unocssPlugin from 'unocss/vite'
import solid from 'solid-start/vite'
import { defineConfig } from 'vite'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'
import Unfonts from 'unplugin-fonts/vite'

export default defineConfig({
	assetsInclude: ['**/*.ttf'],
	plugins: [
		solid({
			ssr: false
		}),
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
					/* provider: 'google', */ // default provider
					fonts: {
						// these will extend the default theme
						/* sans: 'Roboto' */
						/* mono: ['Fira Code', 'Fira Mono:400,700'], */
						// custom ones
						/* poppins: [
							{
								name: 'Poppins',
								weights: ['700', '400', '500']
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
				},
				{
					'content-container-wide': 'max-w-[80vw] w-full mx-auto px-8'
				},

				['root', 'selector-[:root]:[--normal_1:0,200,0]'],
				['root', 'selector-[:root]:[--normal_2:0,200,0]'],
				['root', 'selector-[:root]:[--normal_3:0,200,0]'],
				['root', 'selector-[:root]:[--normal_4:0,200,0]'],
				['root', 'selector-[:root]:[--surface:0,200,0]'],
				['root', 'selector-[:root]:[--text:0,200,0]'],
				['root', 'selector-[:root]:[--text_2:0,200,0]'],
				['root', 'selector-[:root]:[--text_3:0,200,0]'],
				['root', 'selector-[:root]:[--text_4:0,200,0]'],
				['root', 'selector-[:root]:[--text_5:0,200,0]'],
				['root', 'selector-[:root]:[--accent_1:0,200,0]'],
				['root', 'selector-[:root]:[--accent_2:0,200,0]'],
				['root', 'selector-[:root]:[--accent_3:0,200,0]'],
				['root', 'selector-[:root]:[--accent_4:0,200,0]'],
				['root', 'selector-[:root]:[--accent_5:0,200,0]'],
				['root', 'selector-[:root]:[--accent_text_1:0,200,0]'],
				['root', 'selector-[:root]:[--accent_text_2:0,200,0]'],
				['root', 'selector-[:root]:[--hero_text_1:0,200,0]']
			],
			rules: [
				[
					'sl-arrow',
					{
						[`--slidy-arrow-size`]: '80px',
						[`--slidy-arrow-color`]: 'white',
						[`--slidy-nav-item-size`]: '4px'
					}
				],
				[
					'overflow-ellipsis',
					{
						['overflow']: 'hidden',
						['text-overflow']: 'ellipsis',
						['white-space']: 'nowrap'
					}
				],
				[
					'height-fill',
					{
						['height']: '-webkit-fill-available'
					}
				],
				[
					'text-balance',
					{
						['text-wrap']: 'balance'
					}
				],
				[
					/^scrollbar-hide$/,
					([r]) => `.scrollbar-hide{scrollbar-width:none}
.scrollbar-hide::-webkit-scrollbar{display:none}`
				],
				[
					/^scrollbar-default$/,
					([r]) => `.scrollbar-default{scrollbar-width:auto}
.scrollbar-default::-webkit-scrollbar{display:block}`
				]
			],
			theme: {
				colors: {
					normal_1: 'rgb(var(--normal_1))',
					normal_2: 'rgb(var(--normal_2))',
					normal_3: 'rgb(var(--normal_3))',
					normal_4: 'rgb(var(--normal_4))',
					surface: 'rgb(var(--surface))',
					text_1: 'rgb(var(--text_1))',
					text_2: 'rgb(var(--text_2))',
					text_3: 'rgb(var(--text_3))',
					text_4: 'rgb(var(--text_4))',
					text_5: 'rgb(var(--text_5))',
					accent_1: 'rgb(var(--accent_1))',
					accent_2: 'rgb(var(--accent_2))',
					accent_3: 'rgb(var(--accent_3))',
					accent_4: 'rgb(var(--accent_4))',
					accent_5: 'rgb(var(--accent_5))',
					accenttext_1: 'rgb(var(--accent_text_1))',
					accenttext_2: 'rgb(var(--accent_text_2))',
					hero_text_1: 'rgb(var(--hero_text_1))'
				}
			}
		})
	]
})
