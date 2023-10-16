import { API_KEY } from "@/api/Api";
import { Category } from "@/types";
import React, { FC, useEffect, useState } from "react";
import s from "../Categories/styles.module.scss";
import axios from "axios";
import Link from "../../../node_modules/next/link";

const Categories: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>(`${API_KEY}/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <div className={s.categories_main_comp}>
        <div className={s.container}>
          <h2>Kаталог категорий</h2>
          <div className={s.categories_main_parent}>
            {categories?.map((el) => (
              <div
                style={{
                  backgroundImage: `url(${el.image})`,
                }}
                className={s.categories_card}
                key={el?._id}
              >
                <Link className={s.category_name} href={`/products/${el?._id}`}>
                  {el?.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
