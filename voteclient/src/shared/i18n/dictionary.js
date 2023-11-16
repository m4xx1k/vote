import 'server-only'

const dictionaries = {
    ru: () => import('./dictionaries/ru.json').then(module => module.default),
    uz: () => import('./dictionaries/uz.json').then(module => module.default)
}

export const getDictionary = async (locale) => dictionaries[locale]()
