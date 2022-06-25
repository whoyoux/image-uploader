import { FC, Dispatch } from 'react';
import Image from 'next/image';

type LoginProps = {
    handleLogin: Dispatch<any>;
};

const Login: FC<LoginProps> = ({ handleLogin }) => {
    return (
        <>
            <div className={`mt-[10vh]  w-full h-[40vh] shadow-2xl rounded-xl`}>
                <div className="flex flex-col items-center gap-5 px-10 justify-center w-full h-full text-xl">
                    {/* <div className="w-full flex items-center justify-center">
                        
                    </div> */}
                    <h1>You have to login to upload a file</h1>
                    <button
                        className="px-10 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-700"
                        onClick={handleLogin}
                    >
                        Login with <span className="font-bold">Google</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
