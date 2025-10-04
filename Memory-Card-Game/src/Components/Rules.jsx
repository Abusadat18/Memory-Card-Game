export function Rules({ setIsRuleActive }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={() => setIsRuleActive(false)}
    >
      <div
        className="m-3 rounded-xl bg-[#d4a373] p-3 text-center text-[#fefae0] shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <h2 className="md:text-3xl">
          <strong>Rules</strong>
        </h2>
        <p>
          Get points by clicking on an image but don't click on any more than
          once!
        </p>
      </div>
    </div>
  );
}
