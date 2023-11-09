'use client';

import  { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    // const handleRemove = useCallback(() => {
    //     onChange('');
    // }, [onChange]);

    return (
        <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='j2tdjbhs'
        options={{maxFiles: 1}}
        >
            {({ open }) => {
                return (
                    <div
                    onClick={() => open?.()}
                    className='
                    relative
                    cursor-pointer
                    hover:opacity-70
                    transition
                    duration-150
                    border-dashed
                    border-2
                    p-20
                    border-neutral-300
                    flex
                    flex-col
                    justify-center
                    gap-4
                    text-neutral-600
                    '>
                        <TbPhotoPlus className='w-20 h-20 mx-auto' />
                        <div className='font-semibold text-lg text-center'>
                            Click to upload
                        </div>
                        {value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image
                                alt='Uploaded image'
                                src={value}
                                layout='fill'
                                style={{ objectFit: 'cover' }} 
                                />
                            </div>)}   
                    </div>   
                )}}
        </CldUploadWidget>
    );
};

export default ImageUpload;