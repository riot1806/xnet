import { API_KEY } from "@/api/Api";
import React, { useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";
import s from "../SubCategoriesBanner/styles.module.scss";
import { Category, SubCategory } from "@/types";
import { useRouter } from "../../../node_modules/next/router";
import Loading from "../Loading";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";

const SubCatBanner = () => {
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
    return el?.id == +catId?.id!;
  });
  return (
    <div className={s.sub_cat_banner_main}>
      <div className={s.container}>
        <div className={s.sub_cat_banner_parent}>
          {categoryFind?.sub_categories?.map((el: SubCategory) => {
            return (
              <Link
                href={`/sub-categories/${el?.id}`}
                className={s.sub_cat_banner_card}
                key={el?.id}
              >
                {el?.image === null ? (
                  <Image fill src="/sub_cat.webp" alt="" />
                ) : (
                  <Image fill src={el?.image} alt="" />
                )}
                <p>{el?.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCatBanner;
