import getCourseById from "@/app/actions/getCourseById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubjectById from "@/app/actions/getSubjectById";
import getTeacherById from "@/app/actions/getTeacherById";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import NotLoggedIn from "@/app/components/NotLoggedIn";
import Image from "next/image";
import React from "react";
import CoursePresentation from "./CoursePresentation";

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
        <CoursePresentation
            currentUser={currentUser}
            courseId={course.id}
            courseName={course.title}
            courseDescription={course.description ?? ''}
            courseImage={course.image ?? ''}
            subjectName={subject.name}
            teacherName={teacher.name}
            teacherImage={teacher.image ?? ''}
        />
    );
};

export default CoursePage;