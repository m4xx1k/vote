import './globals.css'
import Header from "../widgets/layout/ui/Header";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
    title: 'Admin',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <ClerkProvider>


            <html lang="en">
            <body>
            <Header/>
            <div className={'flex flex-col justify-center max-w-6xl mx-auto'}>
                {children}
            </div>
            </body>
            </html>
        </ClerkProvider>
    )
}
