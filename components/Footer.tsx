import { FC } from 'react';

const Footer: FC = () => {
    return (
        <footer className="w-full h-8 flex items-center justify-center">
            <span className="text-sm font-bold">
                {' '}
                <span className="hover:underline cursor-pointer select-none">
                    whx
                </span>{' '}
                @ 2022
            </span>
        </footer>
    );
};

export default Footer;
