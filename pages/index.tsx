import type { NextPage } from "next";
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
      <main
        className="max-w-screen-md mx-auto px-5 flex flex-col justify-between h-[100vh]"
        style={{ minHeight: "-webkit-fill-available" }}
      >
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
