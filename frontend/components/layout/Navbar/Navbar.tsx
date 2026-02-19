"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, ChevronDown, ShoppingCart } from 'lucide-react';
import { logoutAction } from '@/lib/auth-actions';
import { useCart } from '@/context/CartContext';

interface UserInfo {
    id: string;
    email: string;
    fullName: string;
    accountType: string;
}

// Helper to get user info from cookie on client-side
function getUserInfoFromCookie(): UserInfo | null {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const userInfoCookie = cookies.find(c => c.trim().startsWith('userInfo='));

    if (!userInfoCookie) return null;

    try {
        const value = userInfoCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(value));
    } catch {
        return null;
    }
}

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isPending, startTransition] = useTransition();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { cartCount } = useCart();

    // Check auth status on mount and when pathname changes
    useEffect(() => {
        const user = getUserInfoFromCookie();
        setUserInfo(user);
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);

            // Only trigger if scroll difference is significant (reduces jitter)
            if (scrollDifference < 5) return;

            // Show navbar when at top of page
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Hide when scrolling down, show when scrolling up
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true); // Scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction();
        });
    };

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'EcoMarket', href: '/marketplace' },
        { name: 'Edukasi', href: '/edukasi' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
    ];

    const isLoggedIn = !!userInfo;

    return (
        <div className={`
            fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-4
            transform transition-transform duration-500 ease-out will-change-transform
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}>
            <nav className="bg-white/90 shadow-lg backdrop-blur-md py-3 w-full max-w-6xl rounded-full border border-white/20 px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img
                                src="/foto/logo_navbar.png"
                                alt="Go Cycle"
                                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2E8B57] to-[#74B78D]">
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

                    {/* Right Side Section (Cart & Auth) */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className={`
                                relative p-2 transition-colors
                                ${pathname === '/cart' ? 'text-[#2E8B57] bg-green-50 rounded-full' : 'text-gray-600 hover:text-[#2E8B57]'}
                            `}
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth Section */}
                        {isLoggedIn ? (
                            /* Profile Dropdown */
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    disabled={isPending}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 hover:bg-green-100 border border-green-200 transition-all duration-200 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E8B57] to-[#4ADE80] flex items-center justify-center shadow-lg shadow-green-200/50">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                        {userInfo.fullName.split(' ')[0]}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                                        >
                                            {/* User Info Header */}
                                            <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                                                <p className="text-sm font-bold text-gray-800 truncate">{userInfo.fullName}</p>
                                                <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <button
                                                    onClick={() => {
                                                        setIsProfileDropdownOpen(false);
                                                        router.push('/profile');
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-[#2E8B57]" />
                                                    </div>
                                                    <span className="font-medium">Profile</span>
                                                </button>

                                                {/* Dashboard button - only for sellers */}
                                                {userInfo.accountType === 'Penjual' && (
                                                    <button
                                                        onClick={() => {
                                                            setIsProfileDropdownOpen(false);
                                                            router.push('/seller/dashboard');
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium">Dashboard</span>
                                                    </button>
                                                )}

                                                <div className="mx-4 my-1 border-t border-gray-100"></div>

                                                <button
                                                    onClick={() => {
                                                        setIsProfileDropdownOpen(false);
                                                        handleLogout();
                                                    }}
                                                    disabled={isPending}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                                        <LogOut className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    <span className="font-medium">{isPending ? 'Keluar...' : 'Keluar'}</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Auth Buttons for non-logged in users */
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-[#2E8B57] font-medium text-sm px-3 py-2 rounded-full transition-colors">
                                    Masuk
                                </Link>
                                <Link href="/register" className="bg-[#2E8B57] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#246e45] shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5">
                                    Daftar
                                </Link>
                            </>
                        )}
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
                            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden p-6">
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
                                                        block px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-200 flex items-center justify-between group
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

                                    {isLoggedIn ? (
                                        /* Mobile Profile Section */
                                        <>
                                            {/* User Info */}
                                            <div className="flex items-center gap-3 px-4 py-3 bg-green-50 rounded-2xl">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E8B57] to-[#4ADE80] flex items-center justify-center shadow-lg">
                                                    <User className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-gray-800 truncate">{userInfo?.fullName}</p>
                                                    <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
                                                </div>
                                            </div>

                                            <div className={`grid ${userInfo?.accountType === 'Penjual' ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'} pt-2`}>
                                                <button
                                                    onClick={() => {
                                                        setIsMobileMenuOpen(false);
                                                        router.push('/profile');
                                                    }}
                                                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-gray-700 font-bold bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                                                >
                                                    <User className="w-5 h-5" />
                                                    Profile
                                                </button>

                                                {/* Dashboard button - only for sellers */}
                                                {userInfo?.accountType === 'Penjual' && (
                                                    <button
                                                        onClick={() => {
                                                            setIsMobileMenuOpen(false);
                                                            router.push('/seller/dashboard');
                                                        }}
                                                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-gray-700 font-bold bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
                                                    >
                                                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                        </svg>
                                                        Dashboard
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        setIsMobileMenuOpen(false);
                                                        handleLogout();
                                                    }}
                                                    disabled={isPending}
                                                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-bold bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all disabled:opacity-50"
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                    {isPending ? 'Keluar...' : 'Keluar'}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        /* Mobile Auth Buttons */
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <Link
                                                href="/login"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-center px-6 py-4 rounded-2xl text-gray-700 font-bold bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                                            >
                                                Masuk
                                            </Link>
                                            <Link
                                                href="/register"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-center px-6 py-4 rounded-2xl text-white font-bold bg-[#2E8B57] hover:bg-[#246e45] shadow-lg shadow-emerald-500/30 transition-all"
                                            >
                                                Daftar
                                            </Link>
                                        </div>
                                    )}
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
