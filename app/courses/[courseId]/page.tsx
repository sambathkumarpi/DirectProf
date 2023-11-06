import getCourseById from "@/app/actions/getCourseById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubjectById from "@/app/actions/getSubjectById";
import getTeacherById from "@/app/actions/getTeacherById";
import Avatar from "@/app/components/Avatar";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import NotLoggedIn from "@/app/components/NotLoggedIn";
import Image from "next/image";
import React from "react";


interface IParams {
    courseId?: string;
}

const CoursePage = async ({ params } : { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const course = await getCourseById(params);
    const subject = await getSubjectById({ subjectId: course.subjectId });
    const teacher = await getTeacherById({ teacherId: course.teacherId });
    if(!currentUser) {
        return (
            <NotLoggedIn />
        );
    }
    return (
        <Container>
        <div className="
        flex
        flex-col
        justify-center
        items-center
        h-full
        gap-4
        pt-16
        ">
            <div className="flex items-center justify-center">
                <Heading title={course.title} subtitle={subject.name} center />
            </div>
            <div className="absolute top-40 right-40">
                <HeartButton courseId={course.id} currentUser={currentUser} />
            </div>
            <hr className="w-2/3 border-[1px]"/>
            <div className="flex flex-row items-center gap-3">
                Course made by {teacher.name} 
                <Avatar src={teacher.image || '/images/placeholder.jpg'} />
            </div>
            <Image className="rounded-xl" src={course.image || '/images/course.jpeg'} alt={course.title} width={400} height={400}/>
            <div className="text-xl text-justify w-2/3">
            {course.description && typeof course.description === 'string' && (course.description.split('\\n').map((line, index) => (
                <React.Fragment key={index}>
                {line}
                {index <course.description!.split('\\n').length - 1 && <br />}
                </React.Fragment>)
            ))}            
            </div>
            {/* <Button
            label="Enroll"
            onClick={() => {}}
            /> */}
        </div>
        </Container>
    );
};

export default CoursePage;