import React from 'react'

import Link from 'next/link';

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Header = () => {

    const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <header className="header" id="header">
        <nav className="nav container">
            <Link href="/">
                <a className="nav__logo">
                    <i className="ri-leaf-fill"></i> OilShopy
                </a>
            </Link>
            
            {/* Implementar router React */}
            <div className="nav__menu" id="nav-menu">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link href="/">
                            <a className="nav__link active-link">Inicio</a>
                        </Link>
                    </li>
                    <li className="nav__item">
                        <a href="#products" className="nav__link">Productos</a>
                    </li>
                    <li className="nav__item">
                        <a href="#faqs" className="nav__link">FAQs</a>
                    </li>
                    <li className="nav__item">
                        <a href="#contact" className="nav__link">Contáctanos</a>
                    </li>
                </ul>

                <div className="nav__close" id="nav-close">
                    <i className="ri-close-line"></i>
                </div>
            </div>

            <div className="nav__btns">
                {/* DISABLED BY THE MOMENT */}
                {/* <!-- Theme change button --> */}
                <i className="ri-moon-line change-theme" id="theme-button"></i>


                <div className="nav__toggle" id="nav-toggle">
                    <i className="ri-menu-line"></i>
                </div>

                {/* Cart button */}
                <button type='button' className='nav__cart'
                    onClick={() => setShowCart(true)}>
                    {/* <i className='bx bx-shopping-bag'></i> */}
                    <i className="ri-shopping-cart-fill nav__cart-icon"></i>
                    <span className="nav__cart-item-quantity"> {totalQuantities}</span>
                </button>
                {/* Show cart when 'showCart' is true */}
                { showCart && <Cart /> }
            </div>
        </nav>
    </header>
  )
}

export default Header