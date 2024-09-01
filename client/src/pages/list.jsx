import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';



function List(props) {
  const [blogs, setBlogs] = useState([]);



  
  const username = props?.user?.username; 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }), // Send username in the request body
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setBlogs(data.blogs);
      } catch (error) {
        console.log(error.message);
      } 
    };

    fetchBlogs();
  }, [username]); // Dependency array includes username if it changes

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      setBlogs(blogs.filter(blog => blog._id !== id));
      alert('Blog post deleted successfully');
    } catch (error) {
      console.log(error);
      alert('An error occurred while deleting the blog post');
    }
  };
  return (
    <div>
      
      <section className="w-full bg-muted py-14 md:py-24 lg:py-12 bg-blue-100">
        <div className="container px-5 md:px-6">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">All Your BLOG</h1>
            <p className="text-muted-foreground md:text-xl">
              Discover the latest insights, trends, and stories from our expert writers.
            </p>
            
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        {blogs.length > 0 ? (
          <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 md:px-6">
            { blogs && blogs.map((blog) => (
              <article key={blog._id} className="group rounded-lg border bg-background shadow-sm transition-all hover:border-primary hover:shadow-md w-[24rem]">
                
                  <img
                    src={blog.content[2].data || '/placeholder.svg'}
                    alt={"error"}
                    width="300"
                    height="200"
                    className="aspect-[3/2] w-full rounded-t-lg object-cover object-center"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold group-hover:text-primary">
                      {blog.content[0].data}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-muted-foreground">
                      {blog.content[1].data}
                    </p>
                    <div className='flex'>
                    <div className="mt-4">
                      <a 
                        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-5 mr-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        href={`/blogs/${blog._id}`}
                      >
                        Read More
                      </a>
                    </div>
                    <div className="mt-4">
                      <a 
                        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-5 mr-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        onClick={()=>handleDelete(blog._id)}  
                      >
                         Delete Post
                      </a>
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
      <Footer />
    </div>
  );
}

export default List;
