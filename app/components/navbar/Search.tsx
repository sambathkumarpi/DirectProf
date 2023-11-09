'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
    const [clicked, setClicked] = useState(false);
    let count = 0;
    const {theme} = useTheme();
    const router = useRouter();
    let query = '';

    const search = () => {
        if(query.length>0) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    }

    return (
        <div
        onClick={() => {
            count++;
            if(count%2===0) setClicked(false);
            else setClicked(true);
            }}
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
                className={`
                text-sm
                font-semibold
                ${clicked ? '' : 'border-s-[1px]'}
                pl-2
                pr-2
                flex
                flex-row
                items-center
                `}
                >
                    <input
                    className={`
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    font-semibold
                    ${clicked ? 'show' : 'hidden'}
                    ${theme==='dark'?'text-white':'text-black'}
                    `}
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        query = e.target.value;
                    }}
                    onKeyDown={(e) => {
                        if(e.key==='Enter') {
                            search();
                        }
                    }}
                    />
                    <div
                    className='
                    p-2
                    bg-blue-500
                    rounded-full
                    text-white
                    hover:shadow-md
                    hover:bg-yellow-500'
                    onClick={() => {
                        if(clicked) {
                            search();
                        } 
                    }}
                    >
                        <BiSearch size={18} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Search;