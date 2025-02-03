// Header.tsx (Next.js Frontend)
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useCookies } from 'react-cookie';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = cookies.token;
                if (token) {
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/current-user`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(res.data);
                    console.log("User Data:", res.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, [cookies.token]);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
            removeCookie('token');
            setUser(null);
            console.log("Logged out");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="flex items-center justify-between p-4 md:p-6 bg-[#5A47AB] shadow-md">
            <Link href="/">
                <h2 className="text-xl md:text-2xl font-bold text-[#FBD15B] cursor-pointer">Learnify</h2>
            </Link>

            <nav className="relative">
                <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <ul className="hidden md:flex space-x-4">
                    <li>
                        <a onClick={() => scrollToSection("features")} className="text-white hover:text-[#FBD15B] font-semibold cursor-pointer">
                            Features
                        </a>
                    </li>
                    <li>
                        <a onClick={() => scrollToSection("testimonials")} className="text-white hover:text-[#FBD15B] font-semibold cursor-pointer">
                            Testimonials
                        </a>
                    </li>
                    <li>
                        <a onClick={() => scrollToSection("cta")} className="text-white hover:text-[#FBD15B] font-semibold cursor-pointer">
                            About Us
                        </a>
                    </li>
                </ul>

                {isMenuOpen && (
                    <ul className="absolute right-0 top-full mt-2 bg-[#5A47AB] shadow-lg rounded-md md:hidden">
                        <li>
                            <a onClick={() => scrollToSection("features")} className="block px-4 py-2 text-white hover:text-[#FBD15B] cursor-pointer">
                                Features
                            </a>
                        </li>
                        <li>
                            <a onClick={() => scrollToSection("testimonials")} className="block px-4 py-2 text-white hover:text-[#FBD15B] cursor-pointer">
                                Testimonials
                            </a>
                        </li>
                        <li>
                            <a onClick={() => scrollToSection("cta")} className="block px-4 py-2 text-white hover:text-[#FBD15B] cursor-pointer">
                                About Us
                            </a>
                        </li>
                    </ul>
                )}
            </nav>

            {user ? (
                <div className="flex items-center space-x-4 ml-4">
                    <div className="w-10 h-10 rounded-full bg-[#FBD15B] flex items-center justify-center text-[#5A47AB] font-bold">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <button onClick={handleLogout} className="text-white font-semibold hover:text-[#FBD15B]">
                        Logout
                    </button>
                </div>
            ) : (
                <Link href="/auth">
                    <button className="text-white font-semibold hover:text-[#FBD15B]">Login</button>
                </Link>
            )}
        </header>
    );
};

export default Header;