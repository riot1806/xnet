import { API_KEY } from "@/api/Api";
import CatalogsBanner from "@/components/CatalogsBanner/CatalogsBanner";
import Loading from "@/components/Loading";
import { Product } from "@/types";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../../node_modules/axios/index";
import Link from "../../node_modules/next/link";
import s from "../styles/products.module.scss";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [load, setLoad] = useState(true);

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

  const UZS = new Intl.NumberFormat("uz-UZ");

  return (
    <>
      <div className={s.products_page_main}>
        <CatalogsBanner />
        <div className={s.container}>
          <h1 className={s.products_page_title}>Все наши продукты</h1>
          <div className={s.products_parent}>
            {products?.map((el) => (
              <Link
                href={`/products/${el?.id}`}
                className={s.products_card}
                key={el?.id}
              >
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
                  <b>{UZS.format(el?.price)} сум</b>
                  {el?.old_price === null ? null : <h6>{el?.old_price} сум</h6>}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
