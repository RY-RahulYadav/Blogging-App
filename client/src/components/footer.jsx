import React, { useState } from 'react';

function Footer() {
 return(
    <>
      <footer className="bg-black px-4 py-6 md:px-6 md:py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground text-white">© 2024 Blog. All rights reserved.</p>
          <nav className="flex gap-4">
            <a className="text-sm font-medium hover:underline hover:underline-offset-4  text-white" href="#">
              About
            </a>
            <a className="text-sm font-medium hover:underline hover:underline-offset-4  text-white" href="#">
              Contact
            </a>
            <a className="text-sm font-medium hover:underline hover:underline-offset-4  text-white" href="#">
              Privacy Policy
            </a>
          </nav>
        </div>
      </footer></>
 )
}

export default Footer;
