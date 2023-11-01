import { API_KEY } from "@/api/Api";
import { Product } from "@/types";
import React, { FC, useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";
import s from "../products/styles.module.scss";
import { useRouter } from "../../../node_modules/next/router";
import { BsDot } from "react-icons/bs";
import { Image } from "antd";
import { useCart } from "react-use-cart";
import Loading from "@/components/Loading";
import Head from "../../../node_modules/next/head";
import { characteristics } from "../../characteristics";

const SingleProduct: FC = () => {
  const { addItem, getItem, removeItem } = useCart();
  const [load, setLoad] = useState(true);
  const router = useRouter();
  const prodId = router.query;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(`${API_KEY}/products/`)
      .then((res) => {
        setProducts(res.data);
        setLoad(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (load) return <Loading />;

  const queryFind = products?.find((el) => {
    return el?.id == +prodId?.id!;
  });

  return (
    <>
      <Head>
        <title>X-net | Телекоммуникационное обородувание</title>
      </Head>
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
                <h2>{queryFind?.price.toLocaleString()} сум</h2>
                {/* @ts-ignore */}
                {!getItem(queryFind?.id!) ? (
                  // @ts-ignore
                  <button onClick={() => addItem(queryFind)}>Купить</button>
                ) : (
                  <>
                    {/* @ts-ignore */}
                    <button onClick={() => removeItem(queryFind?.id!)}>
                      Отменить
                    </button>
                  </>
                )}
              </div>
              <div className={s.empty}></div>
              <h3>Описание</h3>
              <p>{queryFind?.description}</p>
            </div>
          </div>
          <div className={s.product_characteristics}>
            <h3>Характеристики</h3>
            <br />
            {characteristics?.map((el) => {
              return (
                <div className={s.characteristics_twise} key={el?.id}>
                  <span>{el?.type} :</span>
                  <span>{el?.desc}</span>
                </div>
              );
            })}
          </div>
          <div className={s.come_back}>
            <button onClick={() => router.back()}>Назад</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
