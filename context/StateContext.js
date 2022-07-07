import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    /**
     * Theses normal variables are just for local, not state
     */
    let foundProduct;
    let index;
    

    /**
     * Function that add to cart an item
     */
     const addToCart = (product, quantity) => {
        // Check if the item is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        // If the item already exists, update the cart items
        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        
        // If the item doesn't exist in the cart, this add it
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);

        }

        toast.success(`${quantity} ${product.name} fue añadido al carrito.`);
    }

    /**
     * Removes item of the cart
     */
    const onRemoveItem = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities ) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    /**
     * Allows set the quantity of the item in the cart
     * @param {*} item Product
     * @param {*} value Value (+) or (-)
     */
    const toggleCartItemQuantity = (item, value) => {
        // index -> id item
        index = cartItems.findIndex((product) => product._id === item._id);
        const newCartItems = cartItems.filter((product) => product._id !== item._id);

        if(value === 'increment'){
            //TODO: Investigar que hace metodo .splice()
            newCartItems.splice(index, 0, { ...item, quantity: item.quantity + 1 });
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        } else if (value === 'decrement'){
            if(item.quantity > 1) {
                newCartItems.splice(index, 0, { ...item, quantity: item.quantity - 1 });
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }

    /**
     * Function that increases the quantity of the item 
     */
    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    }

    /**
     * Function that decreases the quantity of the item
     */
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if(prevQuantity - 1 < 1) return 1;
            
            return prevQuantity - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                quantity,
                increaseQuantity,
                decreaseQuantity,
                addToCart,
                onRemoveItem,
                toggleCartItemQuantity
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);

