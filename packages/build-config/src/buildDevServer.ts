import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { IBuildOptions } from './types/types'

export const buildDevServer = (
	options: IBuildOptions
): DevServerConfiguration => {
	return {
		//5-й шаг
		port: options.port ?? 3000,
		open: true,
		//шаг 10-й react-router-dom
		//чтобы работал роутинг (react-router-dom)
		//если раздавать статику через nginx(deploy), то необходимо делать проксирование index.html это важно!!!
		historyApiFallback: true,
		//14-й шаг Внесение изменений в код без перезагрузки страницы (Hot Module Replacement для react npm install -D @pmmmwh/react-refresh-webpack-plugin + npm install -D react-refresh-typescript)
		//Тем самым сохраняется состояние форм,модалок,счётчиков и т.п. + быстрая работа
		hot: true,
	}
}
