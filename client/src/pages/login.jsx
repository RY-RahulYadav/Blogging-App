import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  // State for form inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, { // Adjust the endpoint as necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data=await response.json()
       console.log(data);
      if (!response.ok) {
        throw new Error('Login failed');
      }
       
      localStorage.setItem('token' , data.token)
     
      alert('login success')
      navigate('/')
      window.location.reload(true)
      console.log('Login successful');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" style={{width:'80vw' , margin:"6rem auto", border:'black solid 1px'}}>
      <div className="flex flex-col p-6 space-y-1">
        <h3 className="whitespace-nowrap font-semibold tracking-tight text-2xl">Login</h3>
        <p className="text-sm text-muted-foreground">Enter your email and password to access your account.</p>
      </div>
      <div className="p-6 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex items-center mt-4">
            <button 
              type="submit"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-black text-white hover:bg-primary/90 h-10 px-4 py-2 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/></>
  );
}

export default Login;
