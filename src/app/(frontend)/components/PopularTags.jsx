import { get } from '@/utils/api';
import React, { useEffect, useState } from 'react';

const PopularTags = () => {
    const [tags, setTags] = useState([]);
    const getTags = async () => {
        try {
            const repsonse = await get('/api/tag');
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
            <div className="p-4 border border-secondary-400 rounded-sm">
                <div className="flex justify-start items-center gap-2 flex-wrap">
                    {tags?.map((tag, index) => (
                        <button
                            key={index}
                            className="border text-sm rounded-lg text-secondary-100 border-[#F6F6F6] py-2 px-3 select-none"
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
