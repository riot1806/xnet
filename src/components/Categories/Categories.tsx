import { API_KEY } from "@/api/Api";
import { Category } from "@/types";
import React, { FC, useEffect, useState } from "react";
import s from "../Categories/styles.module.scss";
import axios from "axios";
import Link from "../../../node_modules/next/link";
import Loading from "../Loading";

const Categories: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .get<Category[]>(`${API_KEY}/categories/`)
      .then((res) => {
        setCategories(res.data);
        setLoad(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (load) return <Loading />;

  return (
    <>
      <div className={s.categories_main_comp}>
        <div className={s.container}>
          <h2>Kаталог категорий</h2>
          <div className={s.categories_main_parent}>
            {categories?.map(
              (el) =>
                !el?.parent_category && (
                  <div
                    style={{
                      backgroundImage: `url(${el.image})`,
                    }}
                    className={s.categories_card}
                    key={el?.id}
                  >
                    <Link
                      className={s.category_name}
                      href={`/products/${el?.id}`}
                    >
                      {el?.name}
                    </Link>
                    <div className={s.sub_cat}>
                      {el?.sub_categories?.map((sub: Category) => (
                        <Link key={sub?.id} href={`/products/${sub?.id}`}>
                          {sub?.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
