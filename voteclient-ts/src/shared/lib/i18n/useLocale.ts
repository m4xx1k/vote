import {usePathname} from "next/navigation";
import { TLocale } from './dictionary';

export function useLocale():TLocale{
    const pathname = usePathname()
	const locale = pathname.split('/')[0]
	if(locale === 'ru' || locale === 'uz') return locale
	else return 'ru'
}
