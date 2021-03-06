import type { NextPage } from 'next';
import Script from 'next/script';
import Head from 'next/head';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    UploadTask
} from 'firebase/storage';

import {
    Header,
    Dropzone,
    Footer,
    Upload,
    Login,
    Success
} from '../components';
import { useAuth } from '../context/AuthContext';

import { storage } from '../config/firebase';

const Home: NextPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadTask, setUploadTask] = useState<UploadTask | null>();
    const [isCanceled, setIsCanceled] = useState(false);
    const [downloadURL, setDownloadURL] = useState('');
    const [filePathToSave, setFilePathToSave] = useState('');

    const { width, height } = useWindowSize();

    const { user, login } = useAuth();

    const refresh = () => {
        uploadTask?.cancel();
        setFile(null);
        setIsUploading(false);
        setIsUploaded(false);
        setIsCanceled(false);
        setProgress(0);
        setUploadTask(null);
        setDownloadURL('');
        setFilePathToSave('');
    };

    const uploadFile = async (file: File) => {
        if (!user) return alert('Not user found! Canceled upload');

        refresh();
        setFile(file);
        setIsUploading(true);

        const filePath = `${user.uid}/${nanoid()}`;
        setFilePathToSave(filePath);

        const storageRef = ref(storage, filePath);

        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploadTask(uploadTask);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const uploadProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploadProgress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    setIsUploaded(true);
                    setDownloadURL(downloadURL);
                });
            }
        );
    };

    const cancelUpload = () => {
        if (isUploaded) return;
        setIsCanceled(true);
        uploadTask?.cancel();
    };

    const handleLogin = async () => {
        try {
            setFile(null);
            setIsUploading(false);
            await login();
        } catch (err) {}
    };

    return (
        <div>
            <Head>
                <title>Image Uploader</title>
                <meta
                    name="description"
                    content="The simplest image uploader"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script id="show-banner" strategy="lazyOnload">
                {`function appHeight() {
          const doc = document.documentElement
          doc.style.setProperty('--vh', (window.innerHeight*.01) + 'px');
          }

          window.addEventListener('resize', appHeight);
          appHeight();`}
            </Script>
            <main className="max-w-screen-md mx-auto px-5 flex flex-col justify-between h-[calc(var(--vh,1vh)*100)]">
                <div>
                    <Header refreshFunction={refresh} />
                    {user ? (
                        isUploading ? (
                            isUploaded ? (
                                <Success
                                    filePath={filePathToSave.replace('/', '-')}
                                />
                            ) : (
                                <Upload
                                    file={file}
                                    cancelUpload={cancelUpload}
                                    progress={progress | 0}
                                    isCanceled={isCanceled}
                                />
                            )
                        ) : (
                            <Dropzone setFile={uploadFile} />
                        )
                    ) : (
                        <Login handleLogin={handleLogin} />
                    )}

                    {isUploaded ? (
                        <Confetti
                            width={width}
                            height={height}
                            recycle={false}
                            numberOfPieces={1000}
                            run={true}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default Home;
