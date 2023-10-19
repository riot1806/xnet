import { API_KEY } from "@/api/Api";
import { Product } from "@/types";
import React, { FC, useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";
import s from "../products/styles.module.scss";
import { useRouter } from "../../../node_modules/next/router";
import { BsDot } from "react-icons/bs";
import { Image } from "antd";
import Link from "../../../node_modules/next/link";
import { useCart } from "react-use-cart";

const SingleProduct: FC = () => {
  const { addItem, getItem, removeItem } = useCart();
  const router = useRouter();
  const prodId = router.query;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(`${API_KEY}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const queryFind = products?.find((el) => {
    return el?._id === prodId?._id;
  });

  return (
    <>
      <div className={s.single_product_page}>
        <div className={s.container}>
          <h1 className={s.single_product_name}>{queryFind?.name}</h1>
          <div className={s.single_product_main}>
            <div className={s.single_product_main_left}>
              <Image.PreviewGroup>
                <Image src={queryFind?.image} />
              </Image.PreviewGroup>
            </div>
            <div className={s.single_product_main_right}>
              <span>
                <BsDot className={s.dot} /> В наличии
              </span>
              <div className={s.add_to_card}>
                <h2>{queryFind?.price} сум</h2>
                {!getItem(queryFind?._id) ? (
                  <button
                    onClick={() => addItem({ ...queryFind, id: queryFind?._id })}
                  >
                    Купить
                  </button>
                ) : (
                  <button onClick={() => removeItem(queryFind?._id)}>
                    Отменить
                  </button>
                )}
              </div>
              <div className={s.empty}></div>
              <h3>Описание</h3>
              <p>{queryFind?.description}</p>
            </div>
          </div>
          <div className={s.come_back}>
            <Link href="/products">
              <button>Назад</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
