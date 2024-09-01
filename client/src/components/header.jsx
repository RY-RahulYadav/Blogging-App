import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

 const Header = (props)=>{
    useEffect(()=>{console.log(props)},[props.isLoggedIn[0]])
function handlelogout(){
  localStorage.clear();
  props.isLoggedIn[1](false);
  props.user[1](null);


}
    return(
        <>
        <div className="">
        <header className="sticky  top-0 z-100 bg-white shadow-sm " >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a className="flex items-center gap-2" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
            <span className="text-lg font-semibold">Blog</span>
          </a>
          <div className="hidden md:flex">
            <nav
              aria-label="Main"
              data-orientation="horizontal"
              dir="ltr"
              className="relative z-10 flex max-w-max flex-1 items-center justify-center"
            >
              <ul className="group flex flex-1 list-none items-center justify-center space-x-1 " dir="ltr" style={{marginLeft:"10rem"}}>
                <li><Link to="/" className="group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">Home</Link></li>
                <li><Link to="/create" className="group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">Create blog</Link></li>
                <li><Link to="/your/post" className="group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">Your blog</Link></li>
                <li><Link to="/all/post" className="group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">All blog</Link></li>
               
              </ul>
            </nav>
          </div>
          {!props.isLoggedIn[0]?<div className="flex gap-2">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              to='/login'
            >
              Login
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-accent-foreground shadow transition-colors hover:bg-accent/90"
              to={'/register'}
            >
              Sign Up
            </Link>
          </div>:
          <div className="flex">
            
            <button type="button" class="flex justify-center items-center py-1 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <img className="w-[1.5rem] h-[1.5rem] mr-3" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" />
            <p style={{fontSize:'1.1rem'}}>{props?.user[0]?.name}</p></button>
            <div>
            <button onClick={handlelogout} type="button" class="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</button>
            </div>
          </div>
          }
        </div>
      </header></div>
      <Outlet/></>
    )
}

export default Header