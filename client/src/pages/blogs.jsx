import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import Header from "../components/header";
import Footer from "../components/footer";

function BlogDetails() {
    const { id } = useParams(); // Get blogId from URL params
    const [blogData, setBlogData] = useState([]);
 

    useEffect(() => {
        async function fetchBlogDetails() {
            try {
                console.log(id);
                
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                console.log(data)
                setBlogData(data);
            } catch (error) {
                console.log(error);
            } 
        }

        fetchBlogDetails();
    }, [id]); // Dependency array includes blogId to refetch if it changes


    return (
        <>
            
            <div className="w-full">
                <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
                    <div className="grid gap-12">
                        <article className="prose prose-gray max-w-none mx-auto lg:max-w-6xl dark:prose-invert">
                            {blogData && blogData?.content?.map((item, index) => (
                                <div key={index}>
                                    <div className="space-y-2 not-prose">
                                        {item.ContenType === 'title' && (
                                            <h2 className="text-4xl my-10 font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                                                {item.data}
                                            </h2>
                                        )}
                                        {index === 0 && (
                                            <p className="text-muted-foreground">
                                                Posted on {new Date().toLocaleDateString()} 
                                            </p>
                                        )}
                                    </div>
                                    {item.ContenType === 'content' && (
                                        <p className="my-20">{item.data}</p>
                                    )}
                                    {item.ContenType === 'image' && (
                                        <img className="my-20" src={item.data} alt="" />
                                    )}
                                </div>
                            ))}
                        </article>

                      
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BlogDetails;
