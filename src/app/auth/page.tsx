'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const AuthPage: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['token']);

    const validateInputs = (): boolean => {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Valid email is required.');
            return false;
        }
        if (!password || password.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return false;
        }
        if (isSignUp && !username) {
            toast.error('Username is required for registration.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${isSignUp ? 'register' : 'login'}`;
            const response = await fetch(url, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, ...(isSignUp ? { username } : {}) })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Authentication failed');
            toast.success(data.message || (isSignUp ? 'Registered successfully!' : 'Logged in!'));

            if (!isSignUp) {
                if (data.token) {
                    setCookie('token', data.token, { path: '/' });

                    // Fetch the current user after login
                    const currentUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/current-user`, {
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                    });

                    if (currentUserResponse.ok) {
                        const userData = await currentUserResponse.json();
                        console.log('Current user:', userData);
                        // Store user info in cookies (for use in other parts of the app)
                        setCookie('user', JSON.stringify(userData), { path: '/' });
                    } else {
                        throw new Error('Unable to fetch current user data');
                    }

                    setTimeout(() => router.push('/'), 1000);
                } else {
                    throw new Error('Login failed: Token missing');
                }
            } else {
                setTimeout(() => setIsSignUp(false), 1000);
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <ToastContainer position="bottom-right" autoClose={3000} />
            <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left - Form */}
                <div className="w-full md:w-1/2 p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{isSignUp ? 'Sign Up' : 'Login'}</h2>
                    <form onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 border border-gray-300 rounded-md" placeholder="Enter your username" />
                            </div>
                        )}
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <span className="px-4 text-gray-600"><FaEnvelope /></span>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 focus:outline-none" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block text-gray-700 font-semibold">Password</label>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <span className="px-4 text-gray-600"><FaLock /></span>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 focus:outline-none" placeholder="Enter your password" />
                            </div>
                        </div>
                        <button type="submit" className={`w-full p-4 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <button onClick={() => setIsSignUp(!isSignUp)} className="text-purple-600 hover:underline">
                            {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
                        </button>
                    </div>
                </div>
                {/* Right - Image */}
                <div className="hidden md:block md:w-1/2 relative">
                    <Image
                        src={isSignUp ? '/signup-image.jpg' : '/login-image.jpg'}
                        alt="Auth Illustration"
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 opacity-50"
                    />
                    <div className="absolute inset-0 bg-purple-700 opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
                        <h2 className="text-3xl font-bold">{isSignUp ? 'Join us and explore new connections!' : 'Every new friend is a new adventure.'}</h2>
                        <p className="mt-4 text-xl">Let’s get connected.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
