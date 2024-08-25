import { get } from "@/utils/api";
import React, { useEffect, useState } from "react";

const PopularTags = () => {
  const [tags, setTags] = useState([]);
  const getTags = async () => {
    try {
      const repsonse = await get("/api/tag");
      setTags(repsonse?.data?.tags);
    } catch (error) {
      setTags([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);
  return (
    tags?.length > 0 && (
      <div className="w-full py-5 px-[15px] border border-[#CBCBCB] sm:border-secondary-400 rounded-sm sm:min-h-[305px] overflow-auto">
        <div className="flex justify-start items-center gap-2.5 flex-wrap">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="border leading-[18px] text-sm rounded-[2px] sm:rounded-lg text-secondary-100 border-[#CBCBCB] sm:border-[#F6F6F6] py-0.5 px-3.5 select-none hover:text-black"
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default PopularTags;
