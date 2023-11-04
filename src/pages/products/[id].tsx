import s from "../products/styles.module.scss";

import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { BsDot } from "react-icons/bs";
import { Image } from "antd";
import Head from "next/head";

import { useGetProductsQuery } from "@/redux/api/productApi";
import { Characteristics, Product } from "@/types";
import Loading from "@/components/Loading";

const SingleProduct = () => {
  const { addItem, getItem, removeItem } = useCart();
  const { data: products, isLoading } = useGetProductsQuery(null);
  const router = useRouter();
  const prodId = router.query;

  if (isLoading) return <Loading />;

  const queryFind = products?.find((el: Product) => {
    return el?.id == +prodId?.id!;
  });

  return (
    <>
      <Head>
        <title>X-NET | {queryFind?.name}</title>
        <meta name="description" content={queryFind?.description} />
        <link rel="icon" href={queryFind?.image} />
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
              {queryFind?.is_used ? (
                <button className={s.used_btn}>USED</button>
              ) : null}
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
            {queryFind?.characteristics?.length ? (
              queryFind?.characteristics?.map((el: Characteristics) => {
                return (
                  <div className={s.characteristics_twise} key={el?.id}>
                    <span className={s.characteristics_key}>{el?.key} :</span>
                    <span className={s.characteristics_key_value}>
                      {el?.value}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className={s.empty_xarakter}>Пусто</p>
            )}
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
