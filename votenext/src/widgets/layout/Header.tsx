'use client'
import Image from 'next/image'
import {usePathname, useRouter} from "next/navigation";
import {clsx} from "clsx";
import goBackImg from '@/assets/images/back.png'

const Header = () => {
    const pathname = usePathname()
    const isMainPage = pathname === '/'
    const bg = isMainPage ? 'bg-blue' : 'bg-white'
    const fill = isMainPage ? 'white' : '#000'

    return (
        <div className={clsx('flex items-center justify-center py-8', bg)}>
            {!isMainPage && <GoBack/>}
            <Logo fill={fill}/>
        </div>
    );
};


const GoBack = () => {
    const router = useRouter()
    const handleGoBack = () => {
        router.back()
    }
    return (
        <button className={'absolute left-4'} onClick={handleGoBack}>
            <Image src={goBackImg.src} width={24} height={20} alt={'go back'}/>
        </button>
    )
}
const Logo = ({fill}) => {
    return <svg width="157" height="24" viewBox="0 0 157 24" xmlns="http://www.w3.org/2000/svg" fill={fill}>
        <path fillRule="evenodd" clipRule="evenodd" fill={fill}
              d="M22.9718 3.34956H6.17387L22.7211 21.7774L20.2035 24L3.77119 5.73913V24H0V0H22.9822L22.9718 3.34956ZM49.6939 2.97391H30.5246V9.74609H44.8363V12.7513H30.5246V21.0261H49.7252V24H26.743V0H49.7252L49.6939 2.97391ZM76.4264 12.7513H57.2258V24H53.5068V0H76.4891L76.4264 12.7513ZM103.305 24H80.1975V0H103.305V24ZM130.017 2.94261H110.816V9.71478H130.017V24H107.035V21.0261H126.235V12.7513H107.055V0H130.038L130.017 2.94261ZM156.99 2.94261H146.825V24H143.064V2.97391H133.663V0H157L156.99 2.94261ZM99.5376 2.97364H83.9619V21.0258H99.5376V2.97364ZM57.2232 2.97364H72.6631V9.74581H57.2232V2.97364Z"/>
    </svg>

}
export default Header;
