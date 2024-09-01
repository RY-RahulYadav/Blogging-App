import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function HomePage(props) {
  const [blogs, setBlogs] = useState([]);
  const username = props?.user?.username
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/get/all`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
         console.log(data.blogs);
         
        setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
        
      } 
    };

    fetchBlogs();
  }, [username]);

 

  return (
    <>
      <div className='fixed w-full'></div>
      <div className="flex min-h-[100dvh] flex-col  ">
        <main className="flex-1 ">
          <section className="w-full bg-muted py-12 md:py-24 lg:py-40 bg-blue-100">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl space-y-6 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to Our Blog</h1>
                <p className="text-muted-foreground md:text-xl">
                  Discover the latest insights, trends, and stories from our expert writers.
                </p>
                <Link to={`/all/post`}
                  
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Read More
                </Link>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            {blogs.length > 0 ? (
              <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 md:px-6">
                {blogs&& blogs.map((blog) => (
                  <article key={blog._id} className="group rounded-lg border bg-background shadow-sm transition-all hover:border-primary hover:shadow-md w-[24rem]">
                    
                      <img
                        src={blog?.content[2].data || '/placeholder.svg'}
                        alt={"err"}
                        width="300"
                        height="200"
                        className="aspect-[3/2] w-full rounded-t-lg object-cover object-center"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold group-hover:text-primary">
                          {blog.content[0].data }
                        </h2>
                        <p className="mt-2 line-clamp-3 text-muted-foreground">
                          {blog.content[1].data }
                        </p>
                        <div className='flex'>
                    <div className="mt-4">
                    <Link to={`/blogs/${blog._id}`}
                        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-5 mr-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        
                      >
                        Read More
                      </Link>
                    </div>
                   </div>
                      </div>
                
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 h-64">
               <img src="https://static.thenounproject.com/png/1453176-200.png" alt=""  style={{width:'6rem', height:'6rem'}}/>
                <h2 className="text-2xl font-bold text-muted-foreground">No Blogs Posted Yet</h2>
                <p className="text-muted-foreground">Be the first to create and share an amazing post!</p>
              </div>
            )}
          </section>
          {/* <section className="w-full bg-muted py-12 md:py-24 lg:py-32 bg-blue-100">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl space-y-6 text-center">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">More from Our Blog</h2>
                <p className="text-muted-foreground md:text-xl">
                  Explore our latest articles and insights on web development, design, and more.
                </p>
                <Link to={`/all/post`}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                 
                >
                  View All Posts
                </Link>
              </div>
            </div>
          </section> */}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
