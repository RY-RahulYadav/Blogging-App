import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Content from '../components/content';
import Title from '../components/title';
import Image from '../components/image';
import { useNavigate } from 'react-router-dom';

function CreateBlogPage(props) {
    
    const [blogData, setBlogData] = useState([{ContenType:"title" , data:""} ,{ContenType:"content" , data:""} ,{ContenType:"image" , data:""}]);
    const navigate = useNavigate()
     const username= props?.user.username;
    const [tag, setTag] = useState([]);

    useEffect(() => {
        
       
    }, [ tag , username  ]);

    function handleClick(type, index) {
        // console.log(index, count);
        setTag((prev) => [...prev, type]);
        setBlogData((prev) => [...prev, { ContenType: type, data: "" }]);
    }
    
    // function handlesingle(type , index){
    //     if (index <= 2 && count === 0) {
    //         setTag((prev) => [...prev, type]);
    //         setBlogData((prev) => [...prev, { ContenType: type, data: "" }]);
    //         setcount(1);
    //         return ;
    //     }
    //     return null;
    // }

    function handleDelete(index) {
        
        const newArray = tag.filter((_, i) => i !== index-3);
        console.log( tag , newArray);
        
        setTag(newArray);
    }

    function handleChange(e, index) {
        const { value } = e.target;
        setBlogData((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, data: value } : item
            )
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // const blog = [...blogData , content];
        // setBlogData(blog)
        const blogEntry = {
            username: username,
            content: blogData,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogEntry),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Blog entry saved:', result);
                alert('blog posted')
                navigate('/')
                window.location.reload(true)
               
            } else {
                console.error('Failed to save blog entry');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div style={{ zIndex: '-1' }}>
          
            <h1 className='text-3xl mt-10' style={{ fontWeight: 'bold', textAlign: 'center' }}>Post Blog</h1>
            <div className="w-full mt-20 mb-20">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-4 md:mx-6 lg:mx-8">
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Title type='main'  ind={0}    changeFunc={handleChange} />
                                <Content type='main' ind={1}   changeFunc={handleChange} />
                                <Image type='main' ind={2} changeFunc={handleChange} />
                            </div>
                        </div>
                        {tag && tag.map((item, index) => (
                            <div key={index+3} className="space-y-4">
                                <div className="space-y-2">
                                    {item === 'title' && <Title ind={index+3} deleteFunc={handleDelete} changeFunc={handleChange} type="" />}
                                    {item === 'content' && <Content ind={index+3} deleteFunc={handleDelete} changeFunc={handleChange} type="" />}
                                    {item === 'image' && <Image ind={index+3} deleteFunc={handleDelete} changeFunc={handleChange} type="" />}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                            <button onClick={() => { handleClick("title") }} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground bg-primary text-primary-foreground">
                                Add Title
                            </button>
                            <button onClick={() => { handleClick("image") }} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background h-10 px-4 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground border-muted text-muted-foreground">
                                Add Image
                            </button>
                            <button onClick={() => { handleClick("content") }} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-4 py-2 rounded-md transition-colors hover:bg-primary hover:text-primary-foreground bg-primary text-primary-foreground">
                                Add Content
                            </button>
                        </div>
                        <button type='submit' onClick={(e)=>handleSubmit(e)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateBlogPage;
