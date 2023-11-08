import { FormEvent, useEffect, useState } from "react";
import s from "../styles/cart.module.scss";

import { useCart } from "react-use-cart";
import { BsTrash3 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

import { Cart, Cart as CartType } from "@/types";

const Cart = () => {
  const { items, isEmpty, updateItemQuantity, emptyCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sms, setSms] = useState("Пусто");

  let total = 0;

  const postTelegram = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(
        `https://api.telegram.org/bot6831109574:AAGDzjb-VFistLWtpNdGTy3X5UyWfLF0jn8/sendMessage?chat_id=-4048096582&text=${encodeURIComponent(
          `<b>Детали:</b>

    <b>Имя: ${name}</b>
    <b>Электронная почта: ${email}</b>
    <b>Телефон: +${phone}</b>
    <b>Cообщение: ${sms}</b>
    
${items
  //  @ts-ignore
  .map((item: Cart) => {
    return `
    <b>${item.name}</b>
      ${item?.quantity} штук = ${item?.price.toLocaleString()} сум
    `;
  })
  .join("")}        
    <b>К оплате:</b> ${total.toLocaleString()} сум`,
        )}&parse_mode=html`,
      )
      .then(() => {
        emptyCart();
        window.location.reload();
      });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>X-NET | Корзина</title>
      </Head>
      {isClient && isEmpty ? (
        <>
          <div className={s.empty_cart_main}>
            <div className={s.empty_cart}>
              <Image src="/cart.webp" alt="ПУСТО" fill />
              <h2>В вашей корзине пока пусто</h2>
              <Link href="/vse-tovari">
                <button>Вернуться в меню</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className={s.container}>
          <div className={s.cart_labels}>
            <h2>Корзина</h2>
            <button onClick={() => emptyCart()}>
              <BsTrash3 className={s.cart_trash} />
              Очистить всё
            </button>
          </div>
          <div className={s.cart_page_main}>
            {isClient &&
              // @ts-ignore
              items?.map((el: CartType) => {
                const priceCount = el?.quantity * el?.price;
                total += priceCount;
                return (
                  <div className={s.cart_page_child} key={el?.id}>
                    <img src={el?.image} alt={el?.name} />
                    <p>-</p>
                    {el?.name?.length <= 65 ? (
                      <h4>{el?.name}</h4>
                    ) : (
                      <h4>
                        {el?.name.slice(0, 65)}
                        {"..."}
                      </h4>
                    )}
                    <p>-</p>
                    <b>{priceCount.toLocaleString()} сум</b>
                    <p>-</p>
                    <span>
                      <button
                        onClick={() =>
                          // @ts-ignore
                          updateItemQuantity(el?.id!, el?.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <b>{el?.quantity}</b>
                      <button
                        onClick={() =>
                          // @ts-ignore
                          updateItemQuantity(el?.id!, el?.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </span>
                  </div>
                );
              })}
          </div>
          <div className={s.overall}>
            <h2>К оплате: {total.toLocaleString()} сум</h2>
          </div>
          <br />
          <div className={s.cart_deliver_form}>
            <h2>Оформление заказа</h2>
            <form onSubmit={postTelegram}>
              <p>Ваше имя</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              <p>Ваш e-mail</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <p>Ваш номер телефона</p>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                required
              />
              <p>Ваше сообщение (не обязательно)</p>
              <textarea
                value={sms}
                onChange={(e) => setSms(e.target.value)}
              ></textarea>
              <br />
              <div className={s.go_btn}>
                <button type="submit">Оформить заказ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
