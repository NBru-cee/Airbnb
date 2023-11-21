"use client";

import { useEffect } from "react";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Button from "./components/navbar/Button";
import { useRouter } from "next/navigation";

interface NotFoundProps {
    error: Error;
}

const NotFoundPage: React.FC<NotFoundProps> = ({ error }) => {
    const router = useRouter()
    
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <ClientOnly>
            <EmptyState title="OOPS!" subtitle="Page not found!" />
            <div >
                <Button
                    onClick={() => router.push("/")}
                    label="Return home"
                />
            </div>
        </ClientOnly>
    );
};

export default NotFoundPage;
