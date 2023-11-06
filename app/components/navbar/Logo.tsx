'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            alt="DirectProf Logo"
            className='hidden md:block cursor-pointer'
            width={100}
            height={100}
            onClick={() => router.push('/')}
            src="/images/logo.png"
        />
    );
}

export default Logo;