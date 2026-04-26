"use client";
import { useMemo, useState } from "react";
import { dawn } from "../styles/fonts";
import Image from "next/image";

export default function Images() {
  const totalImages = 52;
  const baseURL = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const imageURLs = Array.from({ length: totalImages }, (_, i) => {
    const imageNumber = i + 1;
    return `${baseURL}good${imageNumber}.jpg`;
  });
  const videoByIndex: Record<number, string> = {
    4: `${baseURL}good5.mp4`,
    13: `${baseURL}good14.mp4`,
    28: `${baseURL}good29.mp4`,
    51: `${baseURL}good53.mp4`,
  };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [failedGridItems, setFailedGridItems] = useState<Set<number>>(
    new Set(),
  );
  const [failedModalItems, setFailedModalItems] = useState<Set<number>>(
    new Set(),
  );
  const boxStyle =
    "rounded-xl overflow-hidden flex items-center justify-center";

  const selectedIsVideo =
    selectedIndex !== null &&
    Object.prototype.hasOwnProperty.call(videoByIndex, selectedIndex);

  const selectedMediaSrc = useMemo(() => {
    if (selectedIndex === null) return null;
    if (selectedIsVideo) return videoByIndex[selectedIndex];
    return imageURLs[selectedIndex];
  }, [selectedIndex, selectedIsVideo, imageURLs]);

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-6 w-full max-w-7xl">
        {imageURLs.map((url, index) => (
          <div
            key={index}
            className={`relative ${boxStyle} ${
              [
                0, 19, 11, 5, 7, 18, 6, 12, 14, 26, 24, 31, 29, 36, 38, 47, 44,
                50, 52, 51,
              ].includes(index)
                ? "md:col-span-2 md:row-span-2"
                : ""
            } ${
              [
                1, 27, 22, 33, 32, 13, 16, 10, 2, 3, 4, 8, 9, 20, 21, 17, 25,
                23, 28, 29, 34, 35, 43, 42, 46, 45,
              ].includes(index)
                ? "md:row-span-2"
                : ""
            } ${[9, 36, 19, 11].includes(index) ? "md:col-span-2" : ""}`}
          >
            {Object.prototype.hasOwnProperty.call(videoByIndex, index) ? (
              <video
                className="w-full h-full object-cover"
                src={videoByIndex[index]}
                autoPlay
                muted
                loop
                playsInline
                onError={() => {
                  setFailedGridItems((prev) => new Set(prev).add(index));
                }}
              />
            ) : failedGridItems.has(index) || !url ? (
              <div className="w-full h-full bg-[#f5ece8] flex items-center justify-center text-[#74070E] text-sm px-3 text-center">
                Image unavailable
              </div>
            ) : (
              <Image
                src={url}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                onError={() => {
                  setFailedGridItems((prev) => new Set(prev).add(index));
                }}
                width={500}
                height={500}
              />
            )}
            <button
              onClick={() => setSelectedIndex(index)}
              className="absolute inset-0 z-10"
              aria-label={`Open portfolio item ${index + 1}`}
            ></button>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {selectedMediaSrc === null || failedModalItems.has(selectedIndex) ? (
            <div className="bg-white rounded-2xl px-6 py-4 text-[#74070E] text-lg">
              Media could not be loaded.
            </div>
          ) : selectedIsVideo ? (
            <video
              src={selectedMediaSrc}
              autoPlay
              muted
              loop
              playsInline
              className="max-w-[90%] max-h-[90%] rounded-xl"
              onError={() => {
                setFailedModalItems((prev) => new Set(prev).add(selectedIndex));
              }}
            />
          ) : (
            <img
              src={selectedMediaSrc}
              alt={`Image ${selectedIndex + 1}`}
              className="max-h-[80vh] max-w-full rounded-2xl"
              onError={() => {
                setFailedModalItems((prev) => new Set(prev).add(selectedIndex));
              }}
            />
          )}
          <p className={`mt-4 text-white text-5xl ${dawn.className}`}>
            {selectedIndex + 1}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((index: number | null) => {
                if (index === null) return null;
                return (index - 1 + totalImages) % totalImages;
              });
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
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((index: number | null) => {
                if (index === null) return null;
                return (index + 1) % totalImages;
              });
            }}
            className="absolute right-4 text-white text-2xl"
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
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-8 right-15 text-white text-2xl"
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
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
