import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Category, Product } from "@/types";
import Loading from "@/components/Loading";
import { API_KEY } from "@/api/Api";
import axios from "../../../node_modules/axios/index";
import CatalogsBanner from "@/components/CatalogsBanner/CatalogsBanner";
import s from "../../styles/products.module.scss";
import Link from "../../../node_modules/next/link";

const SingleCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState<Category[]>([]);
  const catId = router.query;
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .get<Category[]>(`${API_KEY}/categories/`)
      .then((res) => {
        setCategory(res.data);
        setLoad(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (load) return <Loading />;

  const categoryFind = category?.find((el: Category) => {
    return el?.id == catId?.id;
  });

  return (
    <>
      <div className={s.products_page_main}>
        <CatalogsBanner />
        <div className={s.container}>
          <h1 className={s.products_page_title}>{categoryFind?.name}</h1>
          {categoryFind?.products.length ? (
            <div className={s.products_parent}>
              {categoryFind?.products?.map((el: Product) => (
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
                    <b>{el?.price.toLocaleString()} сум</b>
                    {el?.old_price === null ? null : (
                      <h6>{el?.old_price.toLocaleString()} сум</h6>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <h2 className="loading">Товары не найдены</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleCategory;
