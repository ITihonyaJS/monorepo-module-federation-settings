export interface IBuildPath {
	entry: string
	html: string
	output: string
	src: string
	public: string
}

export type TBuildMode = 'production' | 'development'
export type TBuildPlatform = 'desktop' | 'mobile'

export interface IBuildOptions {
	mode: TBuildMode
	port: number
	paths: IBuildPath
	analyze: boolean
	platform: TBuildPlatform
}
