'use client';

import { useSearchParams } from "next/navigation"
import Container from "../components/Container";
import useSWR from "swr";
import CourseCard from "../components/cards/CourseCard";
import { useEffect } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { get } from "http";

const fetchCourses = async (url: string) => {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('An error occured while fetching the data.');
    }

    return response.json();
};


const SearchPage = () => {
    const search = useSearchParams();

    const searchQuery = search ? search.get('q') : null;

    const { data, isLoading } = useSWR((`/api/search?q=${searchQuery}`), fetchCourses);

    console.log(data);
        return (
        <Container>
            <h1 className="text-2xl font-semibold  pt-16">
                Results for {searchQuery}
            </h1>
            <hr className="my-4" />
            <div className="
            pt-3
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            justify-items-center
            ">
                {isLoading ? (
                    <div className="text-2xl font-semibold text-center w-full">
                        Loading...
                    </div>
                ) : (
                    data.courses.map((course: any) => (
                        <CourseCard
                        disabled={false}
                        key={course.id}
                        data={course}
                        />
                    ))
                )}
            </div>

        </Container>
    )
}

export default SearchPage;