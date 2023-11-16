import '../assets/scss/style.scss'
import {TelegramProvider} from "../shared/providers/TelegramProvider";

export const metadata = {
  title: 'Repost',
}

export default function RootLayout({children, params: {lang}}) {

  return (
      <html lang={lang}>
      <body>
      <TelegramProvider>
        {children}
      </TelegramProvider>
      </body>
      </html>
  )
}
