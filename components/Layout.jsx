import React from 'react';

import Header from './Header';
import Footer from './Footer';

import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const Layout = ({children}) => {
  return (
    <>
        <Header />
        <motion.main
          variants={variants}
          initial='hidden'
          animate='enter'
          exit='exit'
          transition={{type: 'linear'}}
          className="main"
        >
          {children}
        </motion.main>
        <Footer />
        {/* <!--=============== SCROLL UP ===============--> */}
        <a href="#" className="scrollup" id="scroll-up"> 
          <i className="ri-arrow-up-fill scrollup__icon"></i>
        </a>
    </>
  )
}

export default Layout