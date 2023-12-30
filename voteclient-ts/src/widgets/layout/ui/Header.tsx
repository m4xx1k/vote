'use client'
import Image from "next/image";
import Logo from '@/assets/img/logo.svg'
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

const Header = () => {
    const router = useRouter()
    const goBack = () => router.back()
    const pathname = usePathname()
    const lang = pathname.split('/')[1]
    return (
        <header className="header" style={{background:'#fff'}}>
            <div className="header__container">
                <div className="header__body">
                    <Link onClick={goBack} href="#"
                          className="header__back _icon-arrow-left">&nbsp;</Link>
                    <Link href={`/${lang}`} className="header__logo logo">
                        <Image width={157} height={24} src={Logo.src} alt="LOGO"/>
                    </Link>

                </div>
            </div>
        </header>
    );
};

export default Header;
