'use client';

import useEnrollCourseModal from "@/app/hooks/useEnrollCourseModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Search from "../navbar/Search";
import SubjectButton from "../inputs/SubjectButton";
import ImageUpload from "../inputs/ImageUpload";
import { Course, User } from "@prisma/client";
import { SafeUser } from "@/app/types";

interface EnrollCourseModalProps {
    course: Course | null;
    student: SafeUser | null;
    teacherName: string;
}

enum STEPS {
    RECAP = 0,
    CALENDAR = 1,
    PRICE = 2,
    QUESTION = 3
}

const EnrollCourseModal: React.FC<EnrollCourseModalProps> = ({
    course,
    student
}) => {
    const router = useRouter();
    const enrollCourseModal = useEnrollCourseModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.RECAP);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            studentId:'',
            date:''
            
        }
    });
    // const price = watch('price');
    // const tags = watch('tags');
    const date = watch('date');
    const question = watch('question');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.QUESTION) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/courses', data)
        .then((response) => {
            toast.success('Course enrolld successfully!');
            router.refresh();
            reset();
            setStep(STEPS.RECAP);
            // console.log(response.data);
            enrollCourseModal.onClose();
            router.push(`/courses/${response.data.id}`);
        })
        .catch((error) => {
            toast.error('An error occurred while creating the course.');
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.QUESTION) {
            return 'Enroll';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.RECAP) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="What subject does your course belong to?"
            subtitle="Pick a subject"
            />
            <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
            max-h-[50vh]
            overflow-y-auto
            justify-items-center
            ">
                {course?.title}
            </div>
        </div>
    )

    if (step === STEPS.CALENDAR) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="What is the price of your course ?"
                subtitle="Set a price"
                />
                <Input 
                id="price"
                label="Price"
                register={register}
                errors={errors}
                formatPrice
                />
            </div>
        )
    }

    if (step === STEPS.QUESTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="What are the tags of your course ?"
                subtitle="Choose tags"
                />
                <Search />
            </div>
        )
    }

    return (
        <Modal
        disabled={isLoading}
        isOpen={enrollCourseModal.isOpen}
        title="Enroll a course"
        actionLabel={actionLabel}
        onSubmit={handleSubmit(onSubmit)}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step !== STEPS.RECAP ? onBack : undefined}
        onClose={enrollCourseModal.onClose}
        body={bodyContent}
        />
    )
}

export default EnrollCourseModal;