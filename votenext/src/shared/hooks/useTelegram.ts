const tg = window.Telegram?.WebApp


export function useTelegram() {
    const onClose = () => tg.close()
    const user = tg ? tg.initDataUnsafe?.user : null
    return {tg, onClose, user}
}
