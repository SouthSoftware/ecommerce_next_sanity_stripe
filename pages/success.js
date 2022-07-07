import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext' ;

const Success = () => {

  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className='success section container'>
      <div className='success__container'>
        <p className='success__icon'>
          <i className="ri-shopping-bag-fill"></i>
        </p>
        <h2 className='success__title'>¡Gracias por tu pedido!</h2>
        <p className='success__subtitle'>Comprueba tu email </p>
        <p className='success__description'>Si tienes alguna pregunta, por favor envíamos un email a <a className='success__email' href='mailto:order@example.com'>
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type='button' className='button'>
            Continuar comprando
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success