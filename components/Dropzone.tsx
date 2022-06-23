import { Dispatch, useCallback } from "react";

import { useDropzone } from "react-dropzone";

const Dropzone: React.FC<{ setFile: Dispatch<any> }> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/png": [],
        "image/jpeg": [],
        "image/jpg": [],
        "image/webp": [],
        "image/gif": [],
        "image/svg+xml": [],
        "image/heic": [],
      },
    });

  const borderNeutralColor = "border-gray-200";
  const borderSuccessColor = "border-green-400";
  const borderErrorColor = "border-red-500";
  const borderHoverColor = "border-blue-400";

  return (
    <>
      <>
        <div
          className={`mt-[10vh]  w-full h-[40vh] shadow-2xl relative rounded-xl border-2 border-dashed cursor-pointer hover:${borderHoverColor} hover:bg-blue-400/5 ${
            isDragAccept && borderSuccessColor
          } ${isDragReject && borderErrorColor}`}
          {...getRootProps()}
        >
          <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="text-xl flex flex-col items-center absolute z-20">
              {isDragReject ? (
                <>
                  We support only 1 file per upload in one of these formats:
                  <span className="text-xs ml-3">
                    .PNG | .JPG | .JPEG | .HEIC | .GIF | .WEBP | .SVG
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  Drag and drop a file or{" "}
                  <label
                    htmlFor="file"
                    className="cursor-pointer text-blue-500 hover:text-blue-600 block hover:underline"
                  >
                    Upload a file
                  </label>
                  <span className="text-xs ml-3">
                    .PNG | .JPG | .JPEG | .HEIC | .GIF | .WEBP | .SVG
                  </span>
                </>
              )}
            </div>
            <input
              accept=".png, .jpg, .jpeg, .heic, .gif, .webp, .svg"
              className="h-full w-full hidden"
              {...getInputProps()}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default Dropzone;
