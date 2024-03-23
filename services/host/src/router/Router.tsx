import { App } from '@/components/App'
import { createBrowserRouter } from 'react-router-dom'
//последний шаг...импортируем наши роуты
//пути для этих роутов складываются из name и ключа поля exposes ('./Router': './src/router/Router.tsx') в webpack.config.ts каждого микросервиса
//@ts-ignore
import adminRoutes from 'admin/Router'
//@ts-ignore
import shopRoutes from 'shop/Router'

//нужна для подстановки в файл bootstrap.tsx
export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [...shopRoutes, ...adminRoutes],
	},
])
