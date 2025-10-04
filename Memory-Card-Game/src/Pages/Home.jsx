import { useEffect, useState } from "react";
import { Rules } from "../Components/Rules";

export function Home() {
  const [catInfo, setCatInfo] = useState([]);
  const [isRuleActive, setIsRuleActive] = useState(false);

  useEffect(() => {
    async function getCatsInfo() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=lHewHPbDqLntMxWfLpxMDHm5ROyebhjC&q=cat&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
      );
      const data = await response.json();
      setCatInfo(data.data); // returns an array of objects
    }

    getCatsInfo();
  }, []);

  // Shuffle cat info array using Fisher Yates algo
  function shuffleCatInfo() {
    const shuffledArray = [...catInfo];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setCatInfo(shuffledArray);
  }

  return (
    <>
      <div className="relative flex items-center justify-center">
        <h1 className="text-2xl md:text-5xl">
          <strong>Cat Memory Game</strong>
        </h1>
        <button
          className="center absolute right-1.5"
          onClick={() => setIsRuleActive(true)}
        >
          Rules
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {catInfo.map((item) => {
          return (
            <div // Card
              key={item.id}
              className="grid h-[140px] w-[100px] grid-rows-6 overflow-hidden rounded-xl border border-red-600 bg-[#d4a373] text-[#fefae0] md:h-[300px] md:w-[230px]"
              onClick={shuffleCatInfo}
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
      {/* Absolute component which will be rendered on the center screen on
      clicking the rules button */}
      {isRuleActive && <Rules setIsRuleActive={setIsRuleActive} />}
    </>
  );
}
