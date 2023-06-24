'use client'
import React, { useState, ChangeEvent, useRef } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from './CategoryFileUpload.module.css';
import { clsx } from 'clsx';
import { File } from 'buffer';
import axios from 'axios';

interface FileUploaderProps {
    acceptedFileTypes?: string[] | null;
    url: string;
    maxFileSize?: number;
    allowMultiple?: boolean;
    label?: string;
    labelAlt?: string;
    cateGory:any    
}

function handleFile(files:any) {
    alert("Number of files: " + files.length);
  }
  

export default function CategoryFileUploader(props: FileUploaderProps) {
    const {
        acceptedFileTypes,
        url, maxFileSize = 5,
        allowMultiple = false,
        label = "",
        labelAlt = "",
        cateGory,        
    } = props;

    const MAX_FILE_BYTES = maxFileSize * 1024 * 1024; // MB to bytes

    // Change the state structure to handle multiple file progress and status
    const [fileProgress, setFileProgress] = useState<{ [key: string]: number }>({});
    const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({});
    const [fileId, setFileID] = useState<{ [key: string]: string }>({});
    const [processId, setProcessId] = useState<{ [key: string]: string }>({});
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    const isError = Object.values(fileStatus).some(status => status !== 'Uploaded');
    //drag purpose 
    const [dragActive, setDragActive] = React.useState(false);

    //function remove
    const getFilterObject =(data:Object, id:string)=>{
        const filterIdArray = Object.entries(data);
        const filteredId = filterIdArray.filter(([key, value]) => value !== id);
        const filterIdObj = Object.fromEntries(filteredId);
        return filterIdObj;
    }
    //do process the uploade file
    const processFile=async(id:string)=>{
        const response = await axios.get(`${url}process_single/${id}`);
        setProcessId(prev => ({ ...prev, [id]: "Processing.."}));
        if(response.data.done_split > 0){         
            setProcessId(getFilterObject(processId,id))               
            setFileID(getFilterObject(fileId,id));

        }
    }
    // Create a ref for the file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    //drag purpose
    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    // handle drag events
    const handleDrag = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
        } else if (e.type === "dragleave") {
        setDragActive(false);
        }
    };
  
    // triggers when file is dropped
    const handleDrop = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        //handleFile(e.dataTransfer.files);
           resetUploader();
           fileSelectedHandler(e.dataTransfer.files);
        }
    };


    //end drag purpose

    const handleChange = function(e:any) {
        e.preventDefault();
        if (e.target.files) {
          //handleFile(e.target.files);
          
          fileSelectedHandler(e.target.files);
          resetUploader();
        }
    };


    const resetUploader = () => {
        setFileProgress({});
        setFileStatus({});
        setFileID({});
        setUploadError(null);
        setUploadSuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const fileSelectedHandler = (event_files:Array<any>) => {
        setUploadError(null); // reset the upload error when a new file is selected
        //event.preventDefault();
        if (event_files) {
            const files = Array.from(event_files);
            let isValid = true; // Flag to check if all files are valid
            let fileErrors: { [key: string]: string } = {};

            for (const file of files) {
                if (file.size > MAX_FILE_BYTES) {
                    fileErrors[file.name] = `File size cannot exceed ${maxFileSize} MB`;
                    isValid = false;
                }
                if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
                    fileErrors[file.name] = "File type not accepted. Accepted types: " + acceptedFileTypes.join(', ');
                    isValid = false;
                }
            }

            if (!isValid) {
                setFileStatus(fileErrors);
            } else {
                files.forEach(file => {
                    setFileProgress(prev => ({ ...prev, [file.name]: 0 }));
                    fileUploadHandler(file);
                });
            }
        }
    };

    const fileUploadHandler = (file: File | any) => {
        const formData = new FormData();
        formData.append("uploads", file);
        formData.append("category", JSON.stringify(cateGory));


        const xhr = new XMLHttpRequest();
        xhr.open("POST", url+"upload", true);

        xhr.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                setFileProgress(prev => ({ ...prev, [file.name]: progress }));
            }
        });

        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //console.log(JSON.parse(xhr.responseText).inserted_file_id);
                    let insert_id = JSON.parse(xhr.responseText).inserted_file_id;
                    setFileStatus(prev => ({ ...prev, [file.name]: 'Uploaded' }));
                    setFileID(prev => ({ ...prev, [file.name]: insert_id}));
                    setUploadSuccess(true);
                } else {
                    setFileStatus(prev => ({ ...prev, [file.name]: "An error occurred while uploading the file. Server response: " + xhr.statusText }));
                }
            }
        });

        xhr.send(formData);
    };

    return (
        <div className="flex flex-col gap-4 w-full h-60 md:h-48">
            {/*
                uploadSuccess
                    ?
                    <div className="flex flex-col gap-2">
                        {
                            isError ? <span className="text-xs text-red-500">Upload completed, but with errors.</span> : <></>
                        }
                        <div className="btn-group w-full">
                            <span className="btn btn-success w-1/2">Success!</span>
                            <button
                                className="btn w-1/2"
                                onClick={resetUploader}
                            >Upload Another</button>
                        </div>
                    </div>
                    :*/
                    <div className="form-control w-full">
                        
                        <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>

                        <input
                            type="file"
                        className="inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            /*className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"*/
                            onChange={handleChange}
                            accept={acceptedFileTypes ? acceptedFileTypes.join(',') : undefined}
                            ref={fileInputRef}
                            multiple={allowMultiple} // Added the 'multiple' attribute conditionally
                        />
                            <div className={ clsx(styles.labelFileUpload,'mb-5.5 cursor-pointer appearance-none rounded border-2 border-dashed bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 dark:bg-form-input',dragActive ? "drag-active" : "" )}>
                              <div className="flex flex-col items-center justify-center space-y-3">        
                              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={onButtonClick}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#f1e56c"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#f1e56c"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#f1e56c"
                          />
                        </svg>
                      </span>  
                      <p>
                        <span className="logo-font-color1" onClick={onButtonClick}>Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">{label}</p>
                      <p>({labelAlt})</p>
                      <p>
                      <span className="label-text-alt text-red-500">{uploadError}</span>
                      </p>
          
        </div> 
      </div>

      { dragActive && 
      <div className={styles.dragFileElement} 
      onDragEnter={handleDrag} 
      onDragLeave={handleDrag} 
      onDragOver={handleDrag} onDrop={handleDrop}>        
      </div> }
</form>

                        
                    </div>
            }
            {
            <div className="flex flex-col gap-2">

            <div className="overflow-x-auto flex gap-2 flex-col-reverse">
                {Object.entries(fileProgress).map(([fileName, progress]) => (
                    <div key={fileName} className="text-xs flex flex-col gap-1">
                        <p>{fileName}</p>
                        <div className="flex items-center gap-2">
                            <progress
                                className="progress progress-primary w-full"
                                value={progress}
                                max="100"
                            />
                            {progress === 100 &&
                                <>
                                    {
                                        fileStatus[fileName] === 'Uploaded'
                                            ?
                                            <FaCheck className="text-xl text-green-500 mr-4" />
                                            :
                                            <FaTimes className="text-xl text-red-500 mr-4" />
                                    }
                                    {
                                        fileId[fileName]
                                        ?
                                        processId[fileId[fileName]]?processId[fileId[fileName]]:
                                        <span onClick={processFile.bind(null,fileId[fileName])} className='inline-flex items-center justify-center rounded-md border border-[#f1e56c] py-2 px-10 text-center font-medium bg-black text-[#f1e56c] hover:bg-opacity-90 lg:px-8 xl:px-10'>
                                            Do Proecess</span>
                                        :null
                                    }
                                </>
                            }
                        </div>
                        <p className="text-red-500">{fileStatus[fileName] !== 'Uploaded' ? fileStatus[fileName] : ''}</p>
                    </div>
                ))}
            </div>
            </div>
                        }
        </div>
    );
}