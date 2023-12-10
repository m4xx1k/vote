import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return <SignIn
        appearance={{
            elements: {
                rootBox: 'mx-auto mt-16',
            }
        }}
        signUpUrl={'/sign-in'}
    />;
    // return <></>
}
