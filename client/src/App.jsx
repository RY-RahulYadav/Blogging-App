import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateBlogPage from './pages/createblog';
import BlogDetails from './pages/blogs';
import List from './pages/list';
import Login from './pages/login';
import Register from './pages/signup';
import Header from './components/header';
import AllBlog from './pages/all_blog';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User Data:', userData); // Debugging

            // Check if userData is valid before setting the state
            if (userData && userData.username) { // Adjust this condition based on your API response
              setUser(userData);
              setIsLoggedIn(true);
            } else {
              console.warn('Unexpected user data:', userData);
              setIsLoggedIn(false);
            }
          } else {
            console.warn('Failed to fetch user data:', response.status);
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element = {<Header user={[user, setUser]} isLoggedIn={[isLoggedIn, setIsLoggedIn]} />}>
        <Route path="/" element={<Home user={user} isLoggedIn={isLoggedIn} />} />
        <Route path="/blogs/:id" element={<BlogDetails user={user} isLoggedIn={isLoggedIn} />} />
        <Route path="/create" element={isLoggedIn ? <CreateBlogPage user={user} /> : <Login />} />
        <Route path="/your/post" element={<List user={user} isLoggedIn={isLoggedIn} />} />
        <Route path="/all/post" element={<AllBlog user={user} isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login user={[user, setUser]} isLoggedIn={[isLoggedIn, setIsLoggedIn]} />} />
        <Route path="/register" element={<Register user={[user, setUser]} isLoggedIn={[isLoggedIn, setIsLoggedIn]} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
