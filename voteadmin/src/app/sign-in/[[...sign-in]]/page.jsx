import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return <SignIn
        appearance={{
            elements: {
                rootBox: 'mx-auto mt-16',
                footerAction__signIn:'hidden'
            }
        }}
        signUpUrl={'/sign-in'}
    />;
    // return <></>
}
