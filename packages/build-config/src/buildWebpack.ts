import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { IBuildOptions } from './types/types'

export const buildWebpack = (options: IBuildOptions): webpack.Configuration => {
	const { mode, paths } = options
	const isDev = mode === 'development'
	return {
		mode: mode ?? 'development', //в каком режиме происходит сборка
		//путь до исполняемого файла __dirname(текущая дир),"src","index.js"(склеиваем пути)
		// entry: path.resolve(__dirname, 'src', 'index.tsx'), //1-й шаг
		entry: paths.entry, //1-й шаг
		//настройки лоадеров//4-й шаг
		module: {
			rules: buildLoaders(options),
		},
		devtool: isDev && 'inline-source-map', //6-й шаг для отслеживания ошибок...чтоб в ошибке был указан файл в котором ошибка
		//настройки devserver чтобы в live режиме отображались изменения в коде
		devServer: isDev ? buildDevServer(options) : undefined,
		//нужно чтобы не указывать расширения при импорте файлов
		resolve: buildResolvers(options),
		//куда и как будет происходить сборка
		output: {
			//2-й шаг
			// path: path.resolve(__dirname, 'build'),
			path: paths.output,
			//динамическое название бандла при новой сборке(после как внесли изменения в файлы)[name]- это main(т.к. по умолчание это название entry point)
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: buildPlugins(options),
	}
}
