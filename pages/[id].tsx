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

                <meta property="og:url" content="https://www.whx.world/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Image Uploader whx.world" />
                <meta property="og:description" content="" />
                <meta property="og:image" content={`${fileURL}`} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="whx.world" />
                <meta property="twitter:url" content="https://www.whx.world/" />
                <meta name="twitter:title" content="Image Uploader whx.world" />
                <meta name="twitter:description" content="" />
                <meta name="twitter:image" content={`${fileURL}`} />
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
