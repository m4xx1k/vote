import { TLocale } from '@/shared/lib/i18n/dictionary';
import {TelegramProvider} from "@shared/lib/telegram/TelegramProvider";
import '@/assets/scss/style.scss'

export const metadata = {
  title: 'Repost',
}
type Props = {
	children: React.ReactNode;
	params: {
		language: TLocale;
	};
}
export default function RootLayout({children, params: {language}}:Props) {

  return (
	<html lang={language}>
	<body>
	<TelegramProvider>
		{children}
    </TelegramProvider>
	</body>
	</html>
  )
}