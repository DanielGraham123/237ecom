import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { urlFor, client } from "../../lib/client";

import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  console.log(product);

  const [index, setIndex] = useState(0);

  const { incQty, decQty, qty, addToCart, setShowCart } = useStateContext();

  const buyNow = () => {
    addToCart(product, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
              alt=""
            />
          </div>
          {/* carousel */}
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={item + i * 43}
                src={urlFor(item)}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* product details section */}
        <div className="product-detail-desc">
          <h1>{name}</h1>

          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => buyNow()}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* recommended section */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
  const query = await `*[_type=="product"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = `*[_type == "product" && slug.current != "${slug}"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  console.log(product);

  return {
    props: { product, products },
    revalidate: 5,
  };
};

export default ProductDetails;
