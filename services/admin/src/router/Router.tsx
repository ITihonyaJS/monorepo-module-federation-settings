import { App } from '@/components/App'
import { About } from '@/pages/About'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

//данная константа необходима для того чтобы в неё помещали все страницы этого приложения(если таковые имеются)
const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/admin/about',
				element: (
					<Suspense fallback='Loading...'>
						<About />
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
