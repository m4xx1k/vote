import NextLink from 'next/link';

const defaultClassName = "block py-2 pl-3 pr-4"
const Link = ({children, active, ...rest}) => {
    return (
        <NextLink
            className={defaultClassName}
            {...rest}
        >
            {children}
        </NextLink>


    );
};

export default Link;
