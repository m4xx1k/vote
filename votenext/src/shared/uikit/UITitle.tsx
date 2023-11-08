import {ReactNode} from 'react';
import {clsx} from "clsx";

interface TitleProps {
    children: ReactNode,
    align: 'center' | 'start',
    color?: string,
    bg?: string,
    size?: string,
    font?: string,
    className?:string
}

const defaultClassname = 'font-bold text-black'
const UITitle = ({children, align = 'center', color, bg, size, font, className}: TitleProps) => {
    const alignClass = {
        center: 'text-center',
        start: 'w-full'
    }[align]
    return (
        <h2 className={clsx([
            defaultClassname, alignClass,
            !!color && `text-${color}`,
            !!bg && `bg-${bg}`,
            !!font && `font-${font}`,
            className
        ])}>
            {children}
        </h2>
    );
};

export default UITitle;
