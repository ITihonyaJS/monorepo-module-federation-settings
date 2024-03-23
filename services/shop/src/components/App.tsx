import { Outlet } from 'react-router-dom'
import styles from './App.module.scss'

export const App = () => {
	return (
		<div className={styles.root}>
			<h1>Shop Microservices</h1>
			<Outlet />
		</div>
	)
}
