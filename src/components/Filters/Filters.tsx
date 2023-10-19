import React, { FC, useEffect, useState } from "react";
import s from "../Filters/styles.module.scss";
import { CgMenuGridO } from "react-icons/cg";
import { VscServerProcess } from "react-icons/vsc";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Category, Product } from "@/types";
import axios from "../../../node_modules/axios/index";
import { API_KEY } from "@/api/Api";
import Link from "../../../node_modules/next/link";
import Search from "../Search/Search";

const Filters: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  if (search.length)
    document.body.addEventListener("click", () => {
      setSearch("");
    });

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

  const productSearch = products?.filter((el) => {
    return el?.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className={s.filters}>
        <div className={s.container}>
          <div className={s.filters_main}>
            <Accordion className={s.filters_accordion}>
              <AccordionSummary
                expandIcon={<CgMenuGridO className={s.filter_icon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={s.filters_title}>
                  Каталог товаров
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {categories?.map((el) => (
                  <Link
                    key={el?._id}
                    href={`/products/${el?._id}`}
                    className={s.filters_twise}
                  >
                    <VscServerProcess />
                    <h4>{el?.name}</h4>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
            <div className={s.search_desk}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={s.filters_input}
                type="text"
                placeholder="Название товара..."
              />
              <div
                style={{ display: search.length ? "block" : "none" }}
                className={s.filters_result_box}
              >
                <ul>
                  {productSearch?.length ? (
                    productSearch?.map((el) => {
                      return (
                        <Link href={`/products/${el?._id}`} key={el?._id}>
                          <img src={el?.image} alt="" />
                          {"-"}
                          {el?.name.length <= 58 ? (
                            <p>{el?.name}</p>
                          ) : (
                            <p>
                              {el?.name.slice(0, 58)}
                              {"..."}
                            </p>
                          )}
                          {"-"}
                          <p>{el?.price} сум</p>
                        </Link>
                      );
                    })
                  ) : (
                    <b>Не найдено</b>
                  )}
                </ul>
              </div>
            </div>
            <div className={s.search_mob}>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
