"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Fact = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedFacts = ({
    facts,
    autoplay = false,
}: {
    facts: Fact[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % facts.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + facts.length) % facts.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    // Use deterministic rotation based on index to avoid hydration mismatch
    const getRotation = (index: number) => {
        const rotations = [-8, 6, -4, 10, -6, 8, -10, 4];
        return rotations[index % rotations.length];
    };

    return (
        <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-6xl md:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 items-center">
                <div>
                    <div className="relative h-80 w-full">
                        <AnimatePresence>
                            {facts.map((fact, index) => (
                                <motion.div
                                    key={fact.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: getRotation(index),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : getRotation(index),
                                        zIndex: isActive(index)
                                            ? 40
                                            : facts.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: getRotation(index),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <Image
                                        src={fact.src}
                                        alt={fact.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        draggable={false}
                                        className="rounded-3xl object-cover object-center shadow-2xl"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 className="text-4xl font-black text-gray-900 mb-2">
                            {facts[active].name}
                        </h3>
                        <p className="text-xl font-bold text-[#2E8B57] mb-6">
                            {facts[active].designation}
                        </p>
                        <motion.p className="text-lg text-gray-600 leading-relaxed">
                            {facts[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 pt-12">
                        <button
                            onClick={handlePrev}
                            className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-[#2E8B57] hover:text-white transition-all duration-300"
                        >
                            <IconArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover/button:rotate-12" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-[#2E8B57] hover:text-white transition-all duration-300"
                        >
                            <IconArrowRight className="h-6 w-6 transition-transform duration-300 group-hover/button:-rotate-12" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
