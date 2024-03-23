import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { ModuleOptions } from 'webpack'
import { IBuildOptions } from './types/types'
import { buildBabelLoader } from './babel/buildBabelLoader'

export const buildLoaders = (
	options: IBuildOptions
): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development'

	//шаг-11-й устанавливаем loader для обработки svg изображений(asset)
	//options: { icon: true } нужен для того чтобы работать с svg как с иконками(менять размеры...)
	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	}

	//шаг 10-й устанавливаем loader для обработки изображений(asset)
	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}
	//шаг 9-й устанавливаем и настраиваем работу с scss module
	const cssLoaderWithModules = {
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
			},
		},
	}
	const scssLoader =
		//7-й шаг установка лоадеров для стилей
		//порядок важен!!!
		{
			test: /\.s[ac]ss$/i,
			use: [
				// Creates `style` nodes from JS strings
				// вместо 'style-loader' ставим MiniCssExtractPlugin.loader,
				isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
				// Translates CSS into CommonJS
				cssLoaderWithModules,
				// Compiles Sass to CSS
				'sass-loader',
			],
		}
	//ts-loader умеет работать с jsx
	//если бы мы не использ typescript, ещ пришлось бы кстанавливать babel-loader
	//loader без проверки типов
	// const tsLoader = {
	// 	test: /\.tsx?$/,
	// 	use: 'ts-loader',
	// 	exclude: /node_modules/,
	// }

	// 13-й шаг проверка типов при сборке
	// loader с проверкой типов
	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					//проверка типов...можно сделать что проверка будет только в dev режиме
					// transpileOnly: true,
					transpileOnly: isDev,
					//14-й шаг Внесение изменений в код без перезагрузки страницы (Hot Module Replacement
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				},
			},
		],
		exclude: /node_modules/,
	}

	//шаг 16 Для общего развития вместо ts-loader заиспользуем babel(инструмент который отвечает за компиляцию файлом js,ts и т.п.)
	//Для микрофронтов возвращаем ts-loader
	// const babelLoader = buildBabelLoader(options)

	//порядок важен!!!
	return [
		assetLoader,
		scssLoader,
		// babelLoader,
		tsLoader,
		svgLoader,
	]
}
