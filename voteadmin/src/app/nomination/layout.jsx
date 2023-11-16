
export default function RootLayout({children}) {
    return (
        <div className={'flex flex-col justify-center w-full max-w-4xl mx-auto'}>
            {children}
        </div>
    )
}
