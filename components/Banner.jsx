import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

// We need this for link to product-details
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Banner = ({ banner: {image, description, buttonText, largeText1 } }) => {


  return (

    <>
        <motion.div 
            whileInView={{x: [100, 0], opacity: [0, 1]}}
            transition={{ duration: 2}}
            className='home__img'
        >
            <img src={urlFor(image)} alt='' />
        </motion.div>
                        

        <motion.div 
            whileInView={{y: [-100, 0], opacity: [0, 1]}}
            transition={{ duration: 1}}
            className="home__data">
                <h1 className="home__title">
                    {largeText1}
                </h1>
                <p className="home__description">
                    {description}
                </p>
                <a href="#products" className="button button--flex">
                    {buttonText} <i className="ri-arrow-right-down-line button__icon"></i>
                </a>
        </motion.div>
        
    </>
  )
}

export default Banner;