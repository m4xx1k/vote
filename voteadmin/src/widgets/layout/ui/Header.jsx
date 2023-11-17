import Link from "@/shared/ui/Link";
import Dropdown from "@/shared/ui/Dropdown";
import Image from "next/image";

const Header = () => {
    return (
        <nav className="bg-blue-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap">Admin</span>
                </Link>

                <div className="" id="navbar-dropdown">
                    <ul className="text-white flex items-center gap-4">


                        <li>
                            <Link href="/">Голосование</Link>
                        </li>

                        <li>
                            <Link href="/user">Пользователи</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const dropdownNominationData = {
    label: 'Номинации',
    items: [
        {
            label: 'Создать',
            href: '/nomination/new'
        }, {
            label: 'Редактировать',
            href: '/nomination/edit'
        }, {
            label: 'Изменить Порядок',
            href: '/nomination/order'
        }
    ]
}
const dropdownCandidateData = {
    label: 'Кандидатьі',
    items: [
        {
            label: 'Создать',
            href: '/candidate/new'
        }, {
            label: 'Редактировать',
            href: '/candidate/list'
        }, {
            label: 'Изменить Порядок',
            href: '/candidate/order'
        }
    ]
}
export default Header;
