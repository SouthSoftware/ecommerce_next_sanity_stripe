import React, { useState } from 'react';

import { client, urlFor } from '../../lib/client';

import Product from '../../components/Product';

import { AiOutlineMinus } from 'react-icons/ai';

import { useStateContext } from '../../context/StateContext';

/**
 * If there are suggested products, add as a parameter after productDetails
 * @param {*} param0 
 * @returns 
 */
const ProductDetails = ({ productDetails}) => {

    const { images, name, details, price} = productDetails;
    const [ index, setIndex ] = useState(0);
    const { decreaseQuantity, increaseQuantity, quantity, addToCart, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        addToCart(productDetails, quantity);
    
        setShowCart(true);
      }

    return (
    <section className="product-details section container">
        <div className='product-details__container grid'>
            <div className="product-details__img-container">
                <img src={urlFor(images && images[index])} className="product-details__img-main" />
                <div className='product-details__img-container-smalls'>
                    {images?.map((item, i) => (
                        <img 
                            key={i}
                            src={urlFor(item)}
                            className={ i === index ? 'product-details__img-small selected-image' : 'product-details__img-small'}
                            onMouseEnter={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
            <div className='product-details__detail-container'>
                <h1 className='product-details__detail-title'>{name}</h1>
                <p className='product-details__detail-desc'>{details}</p>
                <p className='product-details__detail-price'>{price} €</p>
                <div className='product-details__detail-quantity'>
                    <p>Cantidad: </p>
                    <p className='product-details__detail-quantity-container'>
                        <span className='product-details__detail-quantity-minus'
                            onClick={decreaseQuantity}>
                            <AiOutlineMinus />
                        </span>
                        <span className='product-details__detail-quantity-number'>
                            {quantity}
                        </span>
                        <span className='product-details__detail-quantity-plus'
                            onClick={increaseQuantity}>
                            <i className="ri-add-line"></i>
                        </span>
                    </p>
                </div>
                <div className='product-details__detail-buttons'>
                    <button type="button" className='product-details__detail- button-alt'
                        onClick={() => addToCart(productDetails, quantity)}>
                        Añadir al carrito
                    </button>
                    <button type="button" className='product-details__detail-buttons-buy button'
                        onClick={handleBuyNow}>
                        Comprar
                    </button>
                </div>
            </div>
        </div>

        {/* Productos sugeridos */}
        {/* {products?.map((item) => (
        <div className='product-details__suggested'>
            <h2>Te puede interesar</h2>
            <div className='marquee'>
                <div className='product-details__suggested-item'>
                    <Product key={item._id} product={item} />
                </div>
            </div>
        </div>
        ))} */}
    </section>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;
    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
    const queryProductDetails = `*[_type == "product" && slug.current == '${slug}'][0]`;
    /**
     * TODO: Cambiar consulta para que me lleguen todos los productos menos el seleccionado 
     * Ya que queremos mostrar productos similares, y el mismo no se debe incluir =========> DONE
     */
    /* const queryProducts = `*[_type == "product" && slug.current != '${slug}']`; */
    
    const productDetails = await client.fetch(queryProductDetails);
    /* const products = await client.fetch(queryProducts); */
  
    /* If there are suggested products, add as a parameter after productDetails */
    return {
      props: { productDetails }
    }
}

export default ProductDetails