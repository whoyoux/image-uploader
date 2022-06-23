import type { NextPage } from "next";
import Script from "next/script";
import Head from "next/head";
import { useState } from "react";

import { Header, Dropzone, Footer } from "../components";

const Home: NextPage = () => {
  const [file, setFile] = useState<File>();

  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = (file: File) => {
    setFile(file);
    console.log(file);
  };

  return (
    <div>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="The simplest image uploader" />
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
          <Header />
          <Dropzone setFile={uploadFile} />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
