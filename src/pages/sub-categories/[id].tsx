import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Category, Product, SubCategory } from "@/types";
import Loading from "@/components/Loading";
import { API_KEY } from "@/api/Api";
import axios from "../../../node_modules/axios/index";
import s from "../../styles/products.module.scss";
import Link from "../../../node_modules/next/link";
import Head from "../../../node_modules/next/head";

const SingleSubCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState<Category[]>([]);
  const catId = router.query;
  const [load, setLoad] = useState(true);
  const [more2, setMore2] = useState(20);

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

  const subCatFind = category?.map((cat: Category) => {
    return cat.sub_categories?.find((sub: SubCategory) => {
      return sub?.id == +catId?.id!;
    });
  });

  const resultFind: any = subCatFind.find((el: any) => el?.id == catId.id);

  return (
    <>
      <Head>
        <title>X-net | Телекоммуникационное обородувание</title>
      </Head>
      <div className={s.products_page_main}>
        <div className={s.container}>
          <span className={s.products_page_title}>
            <h1>{resultFind?.name}.</h1>
            <p>{resultFind?.products.length} товаров</p>
          </span>
          {resultFind?.products.length ? (
            <>
              <div className={s.products_parent}>
                {resultFind?.products?.slice(0, more2).map((el: Product) => (
                  <Link
                    href={`/products/${el?.id}`}
                    className={s.products_card}
                    key={el?.id}
                  >
                    {el?.is_new ? (
                      <button className={s.new_prod_btn}>NEW</button>
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
                    display:
                      more2 >= resultFind?.products?.length ? "none" : "block",
                  }}
                  onClick={() => setMore2((prev) => prev + 8)}
                >
                  Загрузить ещё
                </button>
              </div>
            </>
          ) : (
            <h2 className="loading">Товары не найдены</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleSubCategory;
