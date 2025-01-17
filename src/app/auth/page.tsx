'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${isSignUp ? 'register' : 'login'}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(isSignUp ? { username } : {}),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setSuccessMessage(data.message); // Set success message

      if (isSignUp) {
        setTimeout(() => {
          setIsSignUp(false);
        }, 1000);
      } else {
        // Redirect to the landing page after successful login
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-700 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#39229A] text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className="text-blue-500 hover:underline"
          >
            {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
