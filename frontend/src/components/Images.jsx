import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";

const Images = () => {
  const totalImages = 48;
  const baseURL = "https://folioimagess.s3.us-east-1.amazonaws.com/public/";
  const ImageURLS = Array.from(
    { length: totalImages },
    (_, i) => `${baseURL}good${i + 1}.jpg`
  );
  const videoIndices = [5, 14, 29];
  const videoURLS = [
    `${baseURL}good5.mp4`,
    `${baseURL}good14.mp4`,
    `${baseURL}good29.mp4`,
  ];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const boxStyle =
    "rounded-xl overflow-hidden flex items-center justify-center";

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-6 w-full max-w-7xl">
        {ImageURLS.map((url, index) => (
          <div
            key={index}
            className={`relative ${boxStyle} ${
              [
                0, 19, 11, 5, 7, 18, 6, 12, 14, 26, 24, 31, 29, 36, 38, 47, 44,
              ].includes(index)
                ? "md:col-span-2 md:row-span-2"
                : ""
            } ${
              [
                1, 27, 22, 33, 32, 13, 16, 10, 2, 3, 4, 8, 9, 20, 21, 15, 17,
                25, 30, 23, 28, 29, 34, 35, 43, 42, 46, 45,
              ].includes(index)
                ? "md:row-span-2"
                : ""
            } ${[9, 36, 19, 11].includes(index) ? "md:col-span-2" : ""}`}
          >
            {videoIndices.includes(index) ? (
              <video
                src={videoURLS[videoIndices.indexOf(index)]}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={url}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
              />
            )}
            <button
              onClick={() => setSelectedIndex(index)}
              className="absolute inset-0 z-10"
            ></button>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center z-50 p-4">
          {videoIndices.includes(selectedIndex) ? (
            <video
              src={videoURLS[videoIndices.indexOf(selectedIndex)]}
              autoPlay
              muted
              loop
              playsInline
              className="max-w-[90%] max-h-[90%] rounded-xl"
            />
          ) : (
            <img
              src={ImageURLS[selectedIndex]}
              className="max-h-[80vh] max-w-full rounded-2xl"
            />
          )}
          <p className="mt-4 text-[#74070E] font-dawn text-5xl">
            {selectedIndex + 1}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (index) => (index - 1 + totalImages) % totalImages
              );
            }}
            className="absolute left-4 text-[#74070E] text-2xl"
          >
            <svg
              width="117"
              height="36"
              viewBox="0 0 117 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M115.5 28.5003C101 37.502 42.5 24.9988 48 11.4997C53.5 -1.9994 65 -1.50049 74 11.4994C83 24.4994 61 24.3831 61 24.3831C61 24.3831 34.5 29.9997 1.5 22.9997M1.5 22.9997L12 11.4997M1.5 22.9997L12 34.9997"
                stroke="#74070E"
                stroke-width="2"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((index) => (index + 1) % totalImages);
            }}
            className="absolute right-4 text-[#74070E] text-2xl"
          >
            <svg
              width="117"
              height="36"
              viewBox="0 0 117 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.08795 28.7813C15.6173 37.8957 74.0761 24.9836 68.5321 11.2633C62.988 -2.45707 51.4897 -1.91243 42.5322 11.3464C33.5747 24.6053 55.5742 24.4164 55.5742 24.4164C55.5742 24.4164 82.0924 30.0473 115.069 22.8175M115.069 22.8175L104.532 11.1478M115.069 22.8175L104.609 35.0636"
                stroke="#74070E"
                stroke-width="2"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-8 right-15 text-[#74070E] text-2xl"
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.5L32 31.5M1.5 31.5L32 1.5"
                stroke="#74070E"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Images;
