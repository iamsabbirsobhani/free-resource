'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

export default function ClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
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
      if (!formData.email || !formData.password) {
        setErrorMessage('Please fill all fields');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok || responseData.error) {
        setErrorMessage(responseData.message || 'Login failed');
      } else {
        setSuccessMessage('Login successful!');
        console.log(responseData);
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
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>

        <div className="mt-2">
          <h1 className="text-center">Or</h1>
        </div>
        <div className="flex items-center justify-center">
          <p>No account?</p>&nbsp;
          <Link href="/signup">
            <button className="text-violet-800 underline underline-offset-2 p-2 rounded-md">
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
