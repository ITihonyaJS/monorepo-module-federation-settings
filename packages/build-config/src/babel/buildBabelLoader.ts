import { log } from 'console'
import { IBuildOptions } from '../types/types'
import { removeDataTestIdPlugin } from './removeDataTestIdPlugin'

//т.к. Babel очень легко кастомизировать и добавлять различные плагины(разрастаться)...настройки loader лучше вынести сюда(в отдельный файл)
export const buildBabelLoader = ({ mode }: IBuildOptions) => {
	const isDev = mode === 'development'
	const isProd = mode === 'production'

	const plugins = []
	if (isProd) {
		plugins.push([
			removeDataTestIdPlugin,
			{
				//это и есть наши запрещённые пропсы(forbiddenProps)(идентификаторы)
				props: ['data-testid'],
			},
		])
	}

	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				//добавляем presets для TS + для JSX
				//настройки presets можно отобразить тут или же вынести в отдельный конф.файл babel.config.json(для jest например)
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					[
						'@babel/preset-react',
						//добавляем настройку для разработки в dev режиме с использование dev server...иначе ощибка React is not defined
						{
							runtime: isDev ? 'automatic' : 'classic',
						},
					],
				],
				plugins: plugins.length ? plugins : undefined,
			},
		},
	}
}
