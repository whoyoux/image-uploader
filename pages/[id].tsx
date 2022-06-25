import { NextPage } from 'next';
import Head from 'next/head';

import { ref, getDownloadURL } from 'firebase/storage';

import { storage } from '../config/firebase';

type AssetType = {
    fileURL: string;
};

const Asset: NextPage<AssetType> = ({ fileURL }) => {
    return (
        <>
            <Head>
                <title>Image Uploader</title>
                <meta property="og:title" content="Image Uploader" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={document.URL} />
                <meta property="og:image" content={fileURL} />
                <meta
                    property="og:description"
                    content="Image Uploader - upload your image without annoying stuff."
                />
                <meta name="theme-color" content="#FF0000" />

                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {fileURL ? <img src={fileURL} alt="" /> : <h1>Not found!</h1>}
        </>
    );
};

export async function getServerSideProps({ query }: { query: any }) {
    const filePath = query.id.replace('-', '/');

    const fileRef = ref(storage, filePath);
    try {
        const fileURL = await getDownloadURL(fileRef);
        return {
            props: { fileURL } // will be passed to the page component as props
        };
    } catch (err) {
        return {
            props: {} // will be passed to the page component as props
        };
    }
}

export default Asset;
