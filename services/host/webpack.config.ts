import webpack from 'webpack'
import path from 'path'
import {
	IBuildPath,
	TBuildMode,
	TBuildPlatform,
	buildWebpack,
} from '@packages/build-config'
import packageJson from './package.json'

interface IEnvVariables {
	mode?: TBuildMode
	port?: number
	analyze: boolean
	//12-й шаг добавляем глобальны переменные сборки
	platform?: TBuildPlatform
	//env запуска наших микросервисов
	SHOP_REMOTE_URL?: string
	ADMIN_REMOTE_URL?: string
}
//чтобы TS понимал этот файл,нужно добавить в tsconfig.json ("resolveJsonModule": true)

export default (env: IEnvVariables) => {
	console.log(env, 'env')
	const paths: IBuildPath = {
		//путь до исполняемого файла __dirname(текущая дир),"src","index.js"(склеиваем пути)
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		//куда и как будет происходить сборка
		output: path.resolve(__dirname, 'build'),
		//путь до основного html файла(id root)
		html: path.resolve(__dirname, 'public', 'index.html'),
		//путь для alias ('@')
		src: path.resolve(__dirname, 'src'),
		//шаг 15-й работа с папкой public(например favicon)
		//путь до папки public, например нужен для отображения favicon
		public: path.resolve(__dirname, 'public'),
	}
	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
	const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? 'development',
		port: env.port ?? 3000,
		paths,
		analyze: env.analyze,
		platform: env.platform ?? 'desktop',
	})
	//расширяем конфиг webpack для монорепы
	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'host',
			filename: 'remoteEntry.js',

			remotes: {
				shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
				admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
			},
			shared: {
				...packageJson.dependencies,
				react: {
					eager: true,
					// requiredVersion: packageJson.dependencies['react'],
				},
				'react-router-dom': {
					eager: true,
					// requiredVersion: packageJson.dependencies['react-router-dom'],
				},
				'react-dom': {
					eager: true,
					// requiredVersion: packageJson.dependencies['react-dom'],
				},
			},
		})
	)
	return config
}
