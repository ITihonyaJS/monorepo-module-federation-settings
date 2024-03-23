//шаг 8-й добавляем scss module
//создаём данный файл global.d.ts с декларациями типов
declare module '*.module.scss' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames
	export = classNames
}

//шаг 10-й обработка изображений (assets)
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
//шаг-11-й устанавливаем loader для обработки svg изображений(asset)
// если задекларировать вот таким образом типы declare module '*.svg' , то TS не поймёт, что это React Element и не будет автокомплита по пропсам...поэтому лучше вот так...
declare module '*.svg' {
	import React from 'react'
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
	export default SVG
}

//12-й шаг Глобальные переменные
//обязательно нужно объявить и задекларировать здесь,чтобы они были видны отовсюду
declare const __PLATFORM__: 'desktop' | 'mobile'
//как пример можно добавить ещё такую переменную и в зависимости от неё что то добавлять или нет в проект
declare const __ENV_BUILD__: 'development' | 'production'
