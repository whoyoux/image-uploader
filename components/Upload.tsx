import { Dispatch, FC } from 'react';

type UploadProps = {
    file: any;
    progress: number;
    isCanceled: boolean;
    cancelUpload: Dispatch<any>;
};

const sizeFormat = (size: number | undefined) => {
    if (size) {
        const exp = (Math.log(size) / Math.log(1024)) | 0;
        const result = (size / Math.pow(1024, exp)).toFixed(2);

        return result + ' ' + (exp == 0 ? 'bytes' : 'KMGTPEZY'[exp - 1] + 'B');
    } else return 0;
};

const Upload: FC<UploadProps> = ({
    file,
    progress,
    isCanceled,
    cancelUpload
}) => {
    return (
        <>
            <div className={`mt-[10vh]  w-full h-[40vh] shadow-2xl rounded-xl`}>
                <div className="flex flex-col items-start px-10 justify-center w-full h-full text-xl">
                    <div className="w-full flex items-center justify-center">
                        <div className="w-full grid place-items-center">
                            {isCanceled ? (
                                <>
                                    <h1>Canceled!</h1>
                                </>
                            ) : (
                                <>
                                    <div className="w-full flex items-center justify-between ">
                                        <div>{file?.name}</div>
                                        <div>{sizeFormat(file?.size)}</div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full">
                                        <div
                                            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {progress}%
                                        </div>
                                    </div>
                                    <div className="w-full grid place-items-center pt-5">
                                        <button
                                            className="px-3 py-1.5 bg-red-500 text-white rounded-xl hover:bg-red-700"
                                            onClick={cancelUpload}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upload;
