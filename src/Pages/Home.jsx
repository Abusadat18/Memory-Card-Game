import { useEffect, useState } from "react";
import { Rules } from "../Components/Rules";

export function Home() {
  const [catInfo, setCatInfo] = useState([]);
  const [isRuleActive, setIsRuleActive] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    async function getCatsInfo() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=lHewHPbDqLntMxWfLpxMDHm5ROyebhjC&q=cat&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips",
      );
      const data = await response.json();
      const catData = data.data; // returns an array of objects
      const updatedCatData = catData.map((item) => {
        return { ...item, isClicked: false };
      });
      setCatInfo(updatedCatData);
    }

    getCatsInfo();
  }, []);

  // Shuffle cat info array using Fisher Yates algo
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function handleCardClick(clickedItem) {
    // Check if user already clicked this card
    if (clickedItem.isClicked) {
      alert("Oops! You already clicked this cat 😿 Game restarting...");
      restartGame();
      return;
    }

    // Mark this card as clicked
    const updatedCats = catInfo.map((cat) =>
      cat.id === clickedItem.id ? { ...cat, isClicked: true } : cat,
    );

    const newScore = currentScore + 1;

    if (newScore === 15) {
      alert("🎉 You win! All cats remembered!");
      restartGame();
      return;
    }

    // Update state
    setCatInfo(shuffleArray(updatedCats));
    setCurrentScore(newScore);
  }

  function restartGame() {
    const resetCats = catInfo.map((cat) => ({ ...cat, isClicked: false }));
    setCatInfo(shuffleArray(resetCats));
    setCurrentScore(0);
  }

  return (
    <>
      <div className="relative flex items-center justify-center">
        <h1 className="text-2xl md:text-5xl">
          <strong>Cat Memory Game</strong>
        </h1>
        <button
          className="center absolute right-1.5 text-[10px] md:text-xl"
          onClick={() => setIsRuleActive(true)}
        >
          Rules
        </button>
      </div>
      <p className="text-[10px] font-semibold md:text-xl">
        Score: {currentScore}
      </p>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {catInfo.map((item) => {
          return (
            <div // Card
              key={item.id}
              className="grid h-[140px] w-[100px] grid-rows-6 overflow-hidden rounded-xl bg-[#d4a373] text-[#fefae0] md:h-[300px] md:w-[230px]"
              onClick={() => handleCardClick(item)}
            >
              <div className="row-span-5">
                <img
                  src={item.images.original.url}
                  alt=""
                  className="block size-full object-cover"
                />
              </div>
              <p className="self-center justify-self-center text-center text-[10px] leading-none md:text-xl">
                {item.title.replace(/\s*GIF.*$/i, "")}
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
