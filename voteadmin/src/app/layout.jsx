import './globals.css'
import Header from "../widgets/layout/ui/Header";

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Header/>
        <div className={'flex flex-col justify-center max-w-4xl mx-auto'}>
            {children}
        </div>
        </body>
        </html>
    )
}
