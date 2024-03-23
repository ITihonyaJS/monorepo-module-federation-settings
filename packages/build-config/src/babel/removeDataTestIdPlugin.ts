import { PluginItem } from '@babel/core'

//шаг 16-й Babel(как альтернатива ts-loader) + plugin для него
//Создаём плагин для удаления атрибутов data-testid при продакшен сборке
//атрибуты были созданы для тестирования приложения и режиме разработки они нужны и важны,но вот в продакшене они не нужны

//Для использования и создания plugin необходимо установить типы npm i @types/babel__core
export const removeDataTestIdPlugin = (): PluginItem => {
	return {
		visitor: {
			Program(path, state) {
				/*те элементы(props) которые нужно недопустить в прод сборку(например элемент с атрибутом data-testid) и передаём название атрибута в props у плагина [
					removeDataTestIdPlugin,
					{
						//это и есть наши запрещённые пропсы(forbiddenProps)(идентификаторы)
						props: ['data-testid'],
					},
				]	*/
				//это строка помещённая в массив ['data-testid']
				const forbiddenProps = state.opts.props || []
				//ищем наши data-testid
				path.traverse({
					JSXIdentifier(current) {
						//ищем ноду(атрибут у элемента),чтобы убедится что это именно data-testid
						//название атрибута элемента
						const nodeName = current.node.name
						//проверяем есть ли в массиве props кот.мы передали в плагин, атрибут с таким же названием
						if (forbiddenProps.includes(nodeName)) {
							//если нашли...удаляем этот атрибут
							current.parentPath.remove()
						}
					},
				})
			},
		},
	}
}
