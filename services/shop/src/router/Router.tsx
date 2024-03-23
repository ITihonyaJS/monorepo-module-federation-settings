import { App } from '@/components/App'
import { Shop } from '@/pages/Shop'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

//данная константа необходима для того чтобы в неё помещали все страницы этого приложения(если таковые имеются)
const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/shop/main',
				element: (
					<Suspense fallback='Loading...'>
						<Shop />
					</Suspense>
				),
			},
			{
				path: '/shop/second',
				element: (
					<Suspense fallback='Loading...'>
						<div>This is second page</div>
					</Suspense>
				),
			},
		],
	},
]
//используем в bootstrap.tsx
export const router = createBrowserRouter(routes)

//с помощью этого default routes мы будем подключать роуты в Host
export default routes
