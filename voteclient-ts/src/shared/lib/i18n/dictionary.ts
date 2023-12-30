const dictionaries = {
	ru: () => import('./dictionaries/ru.json').then(module => module.default),
	uz: () => import('./dictionaries/uz.json').then(module => module.default),
}

export const getDictionary = async (locale: string) => {
	if (locale !== 'ru' && locale !== 'uz') return dictionaries['ru']()
	return dictionaries[locale]()
}
export type TLocale = 'ru' | 'uz'
