import { API_KEY } from "@/api/Api";
import Loading from "@/components/Loading";
import { Product } from "@/types";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../../node_modules/axios/index";
import Head from "../../node_modules/next/head";
import Link from "../../node_modules/next/link";
import s from "../styles/products.module.scss";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [load, setLoad] = useState(true);
  const [more, setMore] = useState(20);

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

  return (
    <>
      <Head>
        <title>X-net | Телекоммуникационное обородувание</title>
      </Head>
      <div className={s.products_page_main}>
        <div className={s.container}>
          <span className={s.products_page_title}>
            <h1>Все наши продукты.</h1>
            <p>{products.length} товаров</p>
          </span>
          <div className={s.products_parent}>
            {products?.slice(0, more).map((el) => (
              <Link
                href={`/products/${el?.id}`}
                className={s.products_card}
                key={el?.id}
              >
                {el?.is_new ? (
                  <button className={s.new_prod_btn}>Новинка</button>
                ) : null} 
                {el?.is_used ? (
                  <button className={s.used_btn}>USED</button>
                ) : null}
                <img src={el?.image} alt={el?.name} />
                {el?.name?.length <= 45 ? (
                  <h4>{el?.name}</h4>
                ) : (
                  <h4>
                    {el?.name.slice(0, 45)}
                    {"..."}
                  </h4>
                )}
                {el?.description.length <= 85 ? (
                  <p>{el?.description}</p>
                ) : (
                  <p>
                    {el?.description.slice(0, 85)}
                    {"..."}
                  </p>
                )}
                <span>
                  <b>{el?.price.toLocaleString()} сум</b>
                  {el?.old_price === null ? null : (
                    <h6>{el?.old_price.toLocaleString()} сум</h6>
                  )}
                </span>
              </Link>
            ))}
          </div>
          <div className={s.more_btn}>
            <button
              style={{
                display: more >= products?.length ? "none" : "block",
              }}
              onClick={() => setMore((prev) => prev + 8)}
            >
              Загрузить ещё
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
