'use clint'
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter()
    router.push('/sign-in')
    return <></>;
}
