import { FC } from 'react';

type SuccessType = {
    filePath: string;
};

const Success: FC<SuccessType> = ({ filePath }) => {
    const handleCopy = async () => {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(`${document.URL}${filePath}`);
            return alert('Copied!');
        } else {
            document.execCommand('copy', true, `${document.URL}${filePath}`);
            return alert('Copied!');
        }
    };
    return (
        <>
            <div className={`mt-[10vh]  w-full h-[40vh] shadow-2xl rounded-xl`}>
                <div className="flex flex-col items-center gap-5 px-10 justify-center w-full h-full text-xl">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            className="px-10 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-700"
                            onClick={handleCopy}
                        >
                            Click to copy your URL!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Success;
