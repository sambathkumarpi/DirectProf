'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    returnMenu?: boolean;
    noHeight?: boolean;
}

const EmptyState:React.FC<EmptyStateProps> = ({
    title="No exact matches found",
    subtitle="Try changing or removing your filter",
    returnMenu = false,
    noHeight = false
}) => {
    const router = useRouter();

    return (
        <div className={`flex flex-col items-center justify-center gap-2 ${
            noHeight ? '' : 'h-[60vh]'
        }`}>
            <Heading
            center
            title={title}
            subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {returnMenu && (
                    <Button
                    outline
                    label="Return to menu"
                    onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
}

export default EmptyState;