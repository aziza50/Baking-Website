import { crimson, dawn } from "../styles/fonts";

export default function Assortment() {
  const cakeItems = [
    {
      label: "Specialty Cakes",
      image:
        "https://folioimagess.s3.us-east-1.amazonaws.com/public/good25.jpg",
    },
    {
      label: "Number Cakes",
      image:
        "https://folioimagess.s3.us-east-1.amazonaws.com/public/good20.jpg",
    },
    {
      label: "Sourdough",
      image:
        "https://folioimagess.s3.us-east-1.amazonaws.com/public/homepageImage3.jpg",
    },
    {
      label: "Parties & Gatherings",
      image:
        "https://folioimagess.s3.us-east-1.amazonaws.com/public/homepageImage2.jpg",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-20 xl:gap-60 mt-10 lg:mt-20 xl:mt-40 px-4 sm:px-6 sm:py-10 md:px-8 max-w-[1200px] mx-auto">
      <div className="hidden lg:flex flex-col items-center lg:items-start">
        <h1
          className={`text-[#74070E] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl lg:ml-[-180px] [writing-mode:vertical-rl] rotate-180 ${crimson.className}`}
        >
          Assortment
        </h1>
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] border-l-5 border-[#74070E] mt-[-100px] sm:mt-[-120px] md:mt-[-180px] lg:mt-[-350px]"></div>
      </div>

      <div className="lg:hidden text-center mb-6">
        <h2
          className={`text-[#74070E] mb-13 text-5xl sm:text-6xl ${crimson.className}`}
        >
          Assortment
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-22 sm:gap-25 md:gap-25 lg:gap-15 xl:gap-20 w-full lg:w-auto">
        {cakeItems.map((item, index) => (
          <div
            key={index}
            className="relative w-70 sm:w-60 md:w-64 lg:w-72 aspect-square flex items-center justify-center hover:scale-105 transition-transform duration-300 mx-auto sm:mx-0"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-full object-cover rounded-full"
            />
            <svg viewBox="0 0 300 300" className="absolute w-100 h-100">
              <defs>
                <path
                  id={`circlePath-${index}`}
                  d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                  fill="none"
                />
              </defs>
              <text
                fill="#74070E"
                fontSize="32"
                className={` text-3xl ${dawn.className}`}
              >
                <textPath href={`#circlePath-${index}`} startOffset="20%">
                  {item.label}
                </textPath>
              </text>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
