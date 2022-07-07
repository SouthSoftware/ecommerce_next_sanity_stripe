import React from 'react';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';

import Head from 'next/head';

import dynamic from 'next/dynamic';

import 'remixicon/fonts/remixicon.css';

import { AnimatePresence } from 'framer-motion';

//Utils library
const Utilities = dynamic(
  () => 
    import('../lib/utils.js'),
  {ssr:false}
);

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
          <title>Tienda online</title>
      </Head>
      <StateContext>
        <Layout>
          <Toaster />
          <div>
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0,0)}
            >
              <Component {...pageProps} />
            </AnimatePresence>
          </div>
        </Layout>
      </StateContext>
      <Utilities />
    </>
  )
}

export default MyApp
