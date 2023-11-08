import React, {ReactNode} from 'react';
import NextLink from 'next/link'
import {clsx} from "clsx";

interface UILinkProps {
    children: ReactNode,
    variant?: 'green',
    to: string
}

const UiLink = ({children, variant = 'green', to, className}: UILinkProps) => {
    const variantClassName = {
        'green': 'bg-green text-white text-lg p-6 rounded-3xl font bold'
    }[variant]
    return (
        <NextLink className={clsx([className, variantClassName])} href={to}>
            {children}
        </NextLink>
    );
};

export default UiLink;
