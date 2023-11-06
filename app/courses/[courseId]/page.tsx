// 'use client';

import getCourseById from "@/app/actions/getCourseById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubjectById from "@/app/actions/getSubjectById";
import Button from "@/app/components/Button";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Image from "next/image";


interface IParams {
    courseId?: string;
}

const CoursePage = async ({ params } : { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const course = await getCourseById(params);
    const subjectId = course.subjectId;
    const subject = await getSubjectById({ subjectId });
    if(!currentUser) {
        return (
            <>
            <EmptyState
            title="You are not logged in"
            subtitle="Please login to view this page"
            />
            </>
        );
    }
    return (
        <div className="
        flex
        flex-col
        justify-center
        items-center
        h-[70vh]
        gap-4
        ">
            <Heading title={course.title} subtitle={subject.name} center/>
            <hr className="w-2/3 border-[1px]"/>
            <Image className="rounded-xl" src={course.image || '/images/course.jpeg'} alt={course.title} width={400} height={400}/>
            <div className="text-xl">
                {course.description}
            </div>
            {/* <Button
            label="Enroll"
            onClick={() => {}}
            /> */}
        </div>
    );
};

export default CoursePage;