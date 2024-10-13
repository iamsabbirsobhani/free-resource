'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  email: string;
  password: string;
  code: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    code: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.code
      ) {
        throw new Error('Please fill all fields');
      }

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.error) {
        setErrorMessage(responseData.message);
      } else {
        setSuccessMessage(responseData.message);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('id', responseData.user.id);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessage(
        'There was an error submitting the form. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-80 m-auto p-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            id="code"
            placeholder="Enter secret code..."
            className="mt-2 p-2 font-light rounded-md outline-1 outline-violet-500 outline-offset-4 border"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 mt-3">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mt-3">{successMessage}</div>
        )}

        <div>
          <button
            className="mt-5 bg-violet-500 text-white p-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign up'}
          </button>
        </div>

        <div className="mt-2">
          <h1 className="text-center">Or</h1>
        </div>
        <div className="flex items-center justify-center">
          <p>Already have an account?</p>&nbsp;
          <Link href="/login">
            <button className="text-violet-800 underline underline-offset-2 p-2 rounded-md">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
