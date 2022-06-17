import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  const incQty = () => {
    setQty(qty + 1);
  };

  const decQty = () => {
    setQty(qty - 1 < 1 ? 1 : qty - 1);
  };

  const addToCart = (product, quantity) => {
    const productInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice(totalPrice + product.price * quantity);
    setTotalQuantities(totalQuantities + quantity);

    if (productInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, product]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const updateCartItem = (item, action) => {
    console.log("updateCart: ", item);

    if (action === "inc") {
      setCartItems([
        ...cartItems.filter((cItem) => item._id !== cItem._id),
        { ...item, quantity: item.quantity + 1 },
      ]);
      setTotalPrice(totalPrice + item.price);
      setTotalQuantities(totalQuantities + 1);
    } else if (action === "dec") {
      if (item.quantity > 1) {
        setCartItems([
          ...cartItems.filter((cItem) => item._id !== cItem._id),
          { ...item, quantity: item.quantity - 1 },
        ]);

        setTotalPrice(totalPrice - item.price);
        setTotalQuantities(totalQuantities - 1);
      }
    } else {
      return;
    }
  };

  const removeCartItem = (item) => {
    const newCartItems = cartItems.filter((cItem) => cItem._id !== item._id);

    setTotalPrice(totalPrice - item.price * item.quantity);

    setTotalQuantities(totalQuantities - item.quantity);
    setCartItems(newCartItems);
  };

  console.log(totalPrice);

  return (
    <StateContext.Provider
      value={{
        showCart,
        cartItems,
        totalQuantities,
        totalPrice,
        qty,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        incQty,
        decQty,
        addToCart,
        setShowCart,
        updateCartItem,
        removeCartItem,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
