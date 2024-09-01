import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      // Store token in local storage
      localStorage.setItem('token', data.token);

      alert('User registered successfully');

      navigate('/')
      window.location.reload(true)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
   
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md " style={{width:"80vw" , margin:"2rem auto"}}>
      <div className="flex flex-col p-6 space-y-1">
        <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">Sign Up</h3>
        <p className="text-sm text-muted-foreground">Enter your information to create an account.</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="username">
            Username
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="username"
            placeholder="JohnDoe123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="name">
            Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="email"
            placeholder="m@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Password
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       
        <div className="flex items-center p-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-black text-white hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    <Footer/></>
  );
};

export default Register;
