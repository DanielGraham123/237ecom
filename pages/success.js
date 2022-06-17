import React, { useState, useEffect } from "react";

import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";

import { fireworksAnimation } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    fireworksAnimation();
  }, []);

  return (
    <div className="success-wraper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>

        <h2>Thank you for your order!</h2>

        <p className="email-msg">Check your e-mail inbox for the receipt.</p>

        <p className="description">
          If you have any questions, please e-mail
          <a href="mailto:orders@237headphones.com">orders@237headphones.com</a>
        </p>

        <Link href="/">
          <button width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
