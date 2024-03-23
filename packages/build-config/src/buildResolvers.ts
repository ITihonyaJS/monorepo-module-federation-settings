import { Configuration } from 'webpack'
import { IBuildOptions } from './types/types'

export const buildResolvers = (
	options: IBuildOptions
): Configuration['resolve'] => {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		//11-й шаг добавляем базовый url для alias(красивые пути)
		alias: {
			'@': options.paths.src,
		},
	}
}
