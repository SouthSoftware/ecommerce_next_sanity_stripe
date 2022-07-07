import React, { useRef } from 'react';

import { toast } from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

import { AiOutlineMinus } from 'react-icons/ai';


const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, onRemoveItem, toggleCartItemQuantity } = useStateContext();

    const handleCheckout = async () => {

        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });
      

        if(response.statusCode === 500) return;

        const data = await response.json();

        console.log(data);

        toast.loading('Te estamos redirigiendo ...');

        stripe.redirectToCheckout({ sessionId: data.id });

    }

    return (
        <div className="cart" ref={cartRef}>
            <div className="cart__container">
                <button 
                    type="button" 
                    className="cart__heading button--flex"
                    onClick={() => setShowCart(false)}
                >
                    <i className="ri-arrow-left-s-line"></i>
                    <span className='cart__title'>Tu carrito </span>
                    <span className='cart__num-items'>({totalQuantities} artículo/s)</span>
                </button>

                {/* If the cart is empty */}
                {cartItems.length < 1 && (
                    <div className="cart__empty">
                        <i className="ri-shopping-bag-line cart__empty-icon"></i>
                        <h3 className='cart__empty-title'>Tu carrito de la compra está vacío</h3>
                        <button className='cart__empty-button button' type='button' onClick={() => setShowCart(false)}>
                            Continuar comprando
                        </button>
                    </div>
                )}

                <div className='cart__items'>
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className="cart__item" key={item._id}>
                            <img 
                                src={urlFor(item?.images[0])}
                                className='cart__item-img' 
                                alt="" />
                            <div className='cart__item-details'>
                                <p>{item.name}</p>
                                <p>{item.price} €</p>
                                <p className='product-details__detail-quantity-container'>
                                    <span className='product-details__detail-quantity-minus'
                                        onClick={() => toggleCartItemQuantity(item, 'decrement')}>
                                        <AiOutlineMinus />
                                    </span>
                                    <span className='product-details__detail-quantity-number'>
                                        {item.quantity}
                                    </span>
                                    <span className='product-details__detail-quantity-plus'
                                        onClick={() => toggleCartItemQuantity(item, 'increment')}>
                                        <i className="ri-add-line"></i>
                                    </span>
                                </p>
                            </div>
                            <button type='button' className='cart__item-button-remove' onClick={() => onRemoveItem(item)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart__bottom'>
                        <div className='cart__bottom-totalPrice'>
                            <h3>Subtotal:</h3>
                            <span>{Math.round(totalPrice * 100) / 100} €</span>
                        </div>
                        <div className='cart__bottom-buy'>
                            <button type='button' className='button' onClick={handleCheckout}>
                                Finalizar compra
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart