// import { Button } from "flowbite-react"
// import {useForm,SubmitHandler} from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
// import * as yup from "yup";
import { useState,ChangeEvent } from "react";
const TagForm = () => {
  const {VITE_REACT_APP_CLOUDINARY_CLOUD_NAME,VITE_REACT_APP_CLOUDINARY_API_KEY,VITE_REACT_APP_CLOUDINARY_API_SECRET,VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET} = import.meta.env;
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [observance,setObservance] = useState<string[] | null>(null);
  const getTags = async(url:string)=>{
   return await axios.post("http://localhost:8000/api/v1/customVision/tags",{
    image:  url,
    headers: {
      'Content-Type': 'application/json'
    },
   }).then(response => {
    if(response.status) {
      const {data}= response.data;
      setObservance(data);
    }
  }).catch(err => {
    throw new Error(err);
   });
  }
  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
 if(image){
  data.append("file", image);
  data.append(
    "upload_preset",
   `${VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET}` || ""
  );
  data.append(
    "cloud_name",
    `${VITE_REACT_APP_CLOUDINARY_CLOUD_NAME}` || ""
  );
  data.append("folder", "ImageTags");
  try{
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const res = await response.json();
    setUrl(res.secure_url);
    setLoading(false);
    await getTags(res.secure_url);
  }catch(e){
    setLoading(false);
  }
 }
 };
 const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
  }
};

const handleResetClick = () => {
  setPreview(null);
  setImage(null);
};



  

  return (
    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
    <div className="container mx-auto max-w-screen-lg h-full">
      <h4 className="text-center font-bold text-lg my-3">Check Image Tags</h4>
      <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
        <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
          <span>Click to Upload a File</span>&nbsp;
        </p>
        <input
          id="hidden-input"
          type="file"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
        <label htmlFor="hidden-input" className="cursor-pointer">
          <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
            Upload a file
          </div>
        </label>

        <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
          {preview && (
            <img src={preview} alt="preview" className="w-full" />
          )}
        </div>
      </header>
      <div className="flex justify-end pb-8 pt-6 gap-4">
        <button
          onClick={uploadImage}
          className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
          disabled={!image}
        >
          Upload now
        </button>
        <button
          onClick={handleResetClick}
          className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
        >
          Reset
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
          <span>Processing...</span>
        </div>
      ) : (
        url && (
          <div className="pb-8 pt-4 flex flex-col justify-between">
            <img
              src={`${url}`}
              alt="Uploaded"  className="flex flex-row justify-center items-center m-auto"
            />
             <div className="results">
      <p className="text-center">Predicted Outcome property</p>
      <div className="grid grid-cols-4 justify-items-center items-center gap-4 w-full">
    {observance?.map((obs:any, i: number) => (
      <div key={i} className="">
    <div className=" m-2 text-lg font-medium">
      <p className="font-semibold text-gray-900">
      {obs.name || ""}
      </p>
    </div>
    </div>
))}
  </div>
    </div>
          </div>
        )
      )}
    </div>
   
  </div>
  )
}

export default TagForm