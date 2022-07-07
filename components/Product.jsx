import React from 'react';

// We need this for link to product-details
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: {images, name, slug, price } }) => {
  return (
    <Link href={`/product/${slug.current}`}>
        <article className="product__card">
            {/* <div className="product__circle"></div> */}

            <img src={urlFor(images && images[0])} alt={name} className="product__img" />

            <h3 className="product__title">{name}</h3>
            <span className="product__price">{price} €</span>

            {/* <button className="button--flex product__button">
                <i class='bx bx-shopping-bag'></i>
            </button> */}
        </article>
    </Link>
  )
}

export default Product