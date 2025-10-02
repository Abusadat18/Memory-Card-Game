import { useEffect, useState } from "react";

export function Home() {
  const [catInfo, setCatInfo] = useState([]);

  useEffect(() => {
    async function getCatsInfo() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=&q=cat&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
      );
      const data = await response.json();
      console.log(data.data); // returns an array of object
      setCatInfo(data.data);
    }

    getCatsInfo();
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <h1 className="text-2xl md:text-5xl">
          <strong>Cat Memory Game</strong>
        </h1>
        <button className="center absolute right-1.5">Rules</button>
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {catInfo.map((item) => {
          return (
            <div // Card
              key={item.id}
              className="grid h-[140px] w-[100px] grid-rows-6 overflow-hidden rounded-xl border border-red-600 bg-[#d4a373] text-[#fefae0] md:h-[300px] md:w-[230px]"
            >
              <div className="row-span-5">
                <img
                  src={item.images.original.url}
                  alt=""
                  className="block size-full object-cover"
                />
              </div>
              <p className="self-center justify-self-center text-center text-[10px] md:text-xl">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
