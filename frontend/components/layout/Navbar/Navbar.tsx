"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);

            if (scrollDifference < 5) return;

            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Showcase', href: '/showcase' },
        { name: 'Tutorial DIY', href: '/edukasi/diy' },
        { name: 'Waste Journey', href: '/journey' },
        { name: 'Impact', href: '/impact' },
        { name: 'Tentang', href: '/tentang-kami' },
    ];

    return (
        <div className={`
            fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-4
            transform transition-transform duration-500 ease-out will-change-transform
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}>
            <nav className="bg-white/90 shadow-lg backdrop-blur-md py-3 w-full max-w-6xl rounded-full border border-white/20 px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img
                                src="/foto/logo_navbar.png"
                                alt="Go Cycle"
                                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#2E8B57] to-[#74B78D]">
                                Go Cycle
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? 'text-[#2E8B57] bg-green-50 font-bold'
                                            : 'text-gray-600 hover:text-[#2E8B57] hover:bg-gray-50'}
                                    `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side - CTA Button */}
                    <div className="hidden md:flex items-center">
                        <Link 
                            href="/makers" 
                            className="bg-[#2E8B57] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#246e45] shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5"
                        >
                            Eco Makers
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-[#2E8B57] focus:outline-none z-50 relative"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay - Modern & Full Screen */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-4 p-4 md:hidden"
                        >
                            <div className="bg-white/95 backdrop-blur-xl rounded-4xl shadow-2xl border border-white/20 overflow-hidden p-6">
                                <div className="flex flex-col space-y-4">
                                    {navLinks.map((link, index) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                key={link.name}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`
                                                        block px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-200 items-center justify-between group
                                                        ${isActive
                                                            ? 'text-white bg-[#2E8B57] shadow-lg shadow-emerald-500/30'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#2E8B57]'}
                                                    `}
                                                >
                                                    <span>{link.name}</span>
                                                    {isActive && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                    <div className="h-px bg-gray-100 my-2" />

                                    {/* Mobile CTA */}
                                    <Link
                                        href="/makers"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center px-6 py-4 rounded-2xl text-white font-bold bg-[#2E8B57] hover:bg-[#246e45] shadow-lg shadow-emerald-500/30 transition-all"
                                    >
                                        Eco Makers
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
