'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
    const [clicked, setClicked] = useState(false);
    const {theme} = useTheme();
    return (
    <div
    onClick={() => setClicked(!clicked)}
    className="
    border-[2px]
    w-full
    md:w-auto
    py-2
    rounded-xl
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    "
    >
        <div
        className="
        flex
        flex-row
        items-center
        justify-between
        "
        >
            <div
            className={`
            text-sm
            font-semibold
            px-6
            hover:underline
            ${clicked ? 'hidden' : 'show'}
            ${theme==='dark'?'text-white':'text-black'}
            `}>
                Search
            </div>
            <div
            className="
            text-sm
            font-semibold
            border-s-[1px]
            pl-2
            pr-2
            flex
            flex-row
            items-center
            ">
                <div
                className='
                p-2
                bg-blue-500
                rounded-full
                text-white
                hover:shadow-md
                hover:bg-yellow-500'>
                    <BiSearch size={18} />
                </div>
            </div>

        </div>
    </div>
    );
}

export default Search;