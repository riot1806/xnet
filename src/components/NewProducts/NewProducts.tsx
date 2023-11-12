import { useGetProductsQuery } from "@/redux/api/productApi";
import Loading from "../Loading";
import s from "../NewProducts/styles.module.scss";
import { Product } from "@/types";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";

const NewProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery(null);

  if (isLoading) return <Loading />;

  const newProducts = products?.filter((el: Product) => el?.is_new === true);

  return (
    <>
      <div className={s.new_products}>
        <div className={s.container}>
          <h1>Новое поступление.</h1>
          <div className={s.new_products_parent}>
              {newProducts?.map((el: Product) => {
                return (
                  <Link
                    href={`/tovar/${el?.id}`}
                    className={s.new_products_card}
                    key={el?.id}
                  >
                    {el?.is_new ? (
                      <button className={s.new_prod_btn}>Новинка</button>
                    ) : null}
                    <Image fill alt={el?.name} src={el?.image} />
                    <h4>{el?.name}</h4>
                    <p>{el?.description}</p>
                    <span>
                      <b>{el?.price.toLocaleString()} сум</b>
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProducts;
