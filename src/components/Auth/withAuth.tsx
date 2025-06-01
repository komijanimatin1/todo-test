"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/authStore";
import type { ComponentType, FC, JSX } from "react";

export function withAuth<P extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<P>): FC<P> {

    return function ProtectedComponent(props: P) {
        const router = useRouter();
        const isLoggedIn = useAuth((state) => state.isLoggedIn);
        // Redirect user based on authentication status
        useEffect(() => {
            if (!isLoggedIn) {
                router.push("/login");
            } else {
                router.push("/")
            }
        }, [isLoggedIn, router]);

        if (!isLoggedIn) {
            return null;
        }

        // Render the wrapped component
        return <WrappedComponent {...props} />;
    };
}
