import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../reduxs/FetchSlice";
import CopyRight from "./copyright";

const ImageDataComponent = () => {
  const [searchTerm, setSearchTerm] = useState("nature");
  const dispatch = useDispatch();
  const { loading, images, error } = useSelector((state) => state.images);

  // console.log(images);

  useEffect(() => {
    dispatch(fetchData(searchTerm));
  }, [dispatch, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-row gap-2 mx-auto my-0 mt-8 max-w-[1200px] justify-center items-center">
        <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-2xl text-blue-600 hover:underline max-w-[1200px]">
        Error: {error}
      </div>
    );
  }

  // Check if images.photos exists and is an array before mapping
  if (
    !images ||
    !images.photos ||
    !Array.isArray(images.photos) ||
    images.photos.length === 0
  ) {
    return (
      <div className=" flex justify-center items-center text-red-500 flex-col">
        <img
          src="https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png"
          alt="error finding"
          className="w-[500px] h-[500px] mx-auto my-0 mb-4"
        />
        <p className="text-[20px] text-center">No photos available</p>
      </div>
    );
  }

  return (
    <div className="Redux-image-serach max-w-[1200px] mx-auto my-0 mt-8">
      <div className="flex items-center justify-center mb-10">
        <div className="relative">
          <input
            type="text"
            onBlur={handleSearchChange}
            className="border-b border-gray-300 py-1 w-[300px] focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
          />
          <label
            htmlFor="Search"
            className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
          >
            Search
          </label>
        </div>
      </div>

      <div className="flex max-w-[1200px] mx-auto my-0 justify-center items-center flex-wrap gap-[3.25rem]">
        {images.photos.map((photo) => (
          <div
            key={photo.id}
            className="image-item max-w-[1220px] flex justify-center items-center gap-6 flex-col mb-4"
          >
            <img
              src={photo.src.original}
              alt={photo.alt}
              className="w-[500px] h-auto"
            />
            <h1 className="font-bold text-xl text-center">
              {photo.photographer}
            </h1>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <a
                href={photo.photographer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              >
                <button
                  type="button"
                  className="relative text-white font-bold text-[15px] px-8 mt-3"
                >
                  Account Info
                </button>
              </a>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" ml-4 relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              >
                <button
                  type="button"
                  className="relative text-white font-bold text-[15px] px-8 mt-3"
                >
                  More Info
                </button>
              </a>
              <a
                href={photo.src.original}
                target="_blank"
                download={photo.src.original}
                rel="noopener noreferrer"
                className=" ml-4 relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              >
                <button
                  type="button"
                  className="relative text-white font-bold text-[15px] px-8 mt-3"
                >
                  Download
                </button>
              </a>
            </div>
            <p className="text-center">Describtion : {photo.alt}</p>
            <p className="text-center">Avg_Color : {photo.avg_color}</p>
          </div>
        ))}
      </div>
      {images.photos.length > 5 && <CopyRight text="Jayasriraam" />}
    </div>
  );
};

export default ImageDataComponent;
