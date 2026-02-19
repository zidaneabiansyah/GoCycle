"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function GridBackground({
    children,
    className,
    containerClassName,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) {
    return (
        <div className={cn("relative w-full", containerClassName)}>
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    "[background-size:40px_40px]",
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    className
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}
