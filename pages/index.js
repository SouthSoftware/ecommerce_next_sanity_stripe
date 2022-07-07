import React from 'react';

import { Product } from '../components';
import { Banner } from '../components';

import { client } from '../lib/client';

import { motion } from 'framer-motion';

const Home = ({products, bannerData}) => {

  return (
    <>
        {/* Hero section */}
        <section className="home" id="home">
            <div className="home__container container grid">
                {bannerData?.map((banner) => 
                    <Banner key={banner._id} banner={banner} />
                )}
                <motion.div className="home__social"
                            whileInView={{y: [-100, 0], opacity: [0, 1]}}
                            transition={{ duration: 2}}
                >
                    <span className="home__social-follow">Síguenos</span>

                    <div className="home__social-links">
                        <a href="https://twitter.com/" target="_blank" className="home__social-link">
                            <i className="ri-twitter-fill"></i>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" className="home__social-link">
                            <i className="ri-facebook-fill"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" className="home__social-link">
                            <i className="ri-instagram-line"></i>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
        {/* Home Products */}
        <section className="product section container" id="products">
            <h2 className="section__title-center">
                Echa un vistazo a nuestros productos
            </h2>
            <p className="product__description">
                Aquí hay algunas plantas seleccionadas de nuestra sala de exposición, todas están en excelente estado y tienen una larga vida útil. Compra y disfruta de la mejor calidad.
            </p>

            <div className="product__container grid">
                {products?.map((product) => 
                  <Product key={product._id} product={product} />
                )}
            </div>
        </section>
    </>
  )
}

export const getServerSideProps = async () => {
  const queryProducts = '*[_type == "product"]';
  const products = await client.fetch(queryProducts);

  const queryBanner = '*[_type == "banner"]';
  const bannerData = await client.fetch(queryBanner);

  return {
    props: { products, bannerData }
  }
}

export default Home;
