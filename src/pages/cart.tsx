import { Cart } from "@/types";
import React from "react";
import { useCart } from "react-use-cart";
import s from "../styles/cart.module.scss";
import { BsTrash3 } from "react-icons/bs";

const Cart = () => {
  const { items, isEmpty, updateItemQuantity, removeItem, emptyCart } =
    useCart();

  let total = 0;
  return (
    <>
      <div className={s.container}>
        <h1>Корзина</h1>
        <div className={s.cart_page_main}>
          {items?.map((el: Cart) => (
            <div className={s.cart_page_child} key={el?._id}>
              <img src={el?.image} alt={el?.name} />
              <p>-</p>
              {el?.name?.length <= 45 ? (
                  <h4>{el?.name}</h4>
                ) : (
                  <h4>
                    {el?.name.slice(0, 45)}
                    {"..."}
                  </h4>
                )}
              <p>-</p>
              <b>{el?.price} сум</b>
              <p>-</p>
              <span>
                <button>-</button>
                {el?.quantity}
                <button>+</button>
              </span>
              <BsTrash3 className={s.cart_trash} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
