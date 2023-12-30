/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client'
import type { TWebApp, WebAppUser } from '@shared/types/telegram'
import Script from 'next/script'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
type TTelegramContext = {
	webApp: TWebApp
	user: WebAppUser
}
export const TelegramContext = createContext<TTelegramContext | null>(null)

type TelegramProviderProps = {
	children: ReactNode
}

export const TelegramProvider = ({ children }: TelegramProviderProps) => {
	const [webApp, setWebApp] = useState<TTelegramContext | null>(null)

	useEffect(() => {
		const app: TWebApp | undefined = (window as any)?.Telegram?.WebApp
		if (app) {
			app.ready()
			setWebApp({ webApp: app, user: app.initDataUnsafe.user })
		}
	}, [])

	return (
		<TelegramContext.Provider value={webApp}>
			<Script
				src='https://telegram.org/js/telegram-web-app.js'
				strategy='beforeInteractive'
			/>
			{children}
		</TelegramContext.Provider>
	)
}

export const useTelegram = () => useContext(TelegramContext)
