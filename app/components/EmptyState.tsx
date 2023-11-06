'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState:React.FC<EmptyStateProps> = ({
    title="No exact matches found",
    subtitle="Try changing or removing your filter",
    showReset = false
}) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-2">
            <Heading
            center
            title={title}
            subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                    outline
                    label="Remove filters"
                    onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
}

export default EmptyState;