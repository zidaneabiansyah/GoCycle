"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export default function RevealOnScroll({
    children,
    className = "",
    delay = 0,
    direction = "up"
}: RevealOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const getVariants = () => {
        const distance = 50;
        const variants = {
            hidden: { opacity: 0, y: 0, x: 0 },
            visible: { opacity: 1, y: 0, x: 0 }
        };

        switch (direction) {
            case "up":
                variants.hidden = { opacity: 0, y: distance, x: 0 };
                break;
            case "down":
                variants.hidden = { opacity: 0, y: -distance, x: 0 };
                break;
            case "left":
                variants.hidden = { opacity: 0, y: 0, x: distance };
                break;
            case "right":
                variants.hidden = { opacity: 0, y: 0, x: -distance };
                break;
        }
        return variants;
    };

    return (
        <motion.div
            ref={ref}
            variants={getVariants()}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }} // Custom cubic bezier for smooth "apple-like" feel
            className={className}
        >
            {children}
        </motion.div>
    );
}
