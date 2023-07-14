const Prompt = ({text}:any) => {
  return (
    <div className="rounded-sm border border-[#f1e56c] bg-white py-2 px-3 shadow-default dark:border-[#f1e56c] dark:bg-boxdark">
      

      <div className="mt-1 items-end justify-between">
        <div>
          <p className="text-title-sm font-bold text-black dark:text-[#f1e56c]">
            {text}
          </p>
          <span className="text-sm font-medium">Try prompt </span>
        </div>

        
      </div>
    </div>
  );
};

export default Prompt;
