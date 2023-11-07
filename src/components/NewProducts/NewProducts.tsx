import { useGetProductsQuery } from '@/redux/api/productApi';
import Loading from '../Loading';
import s from '../NewProducts/styles.module.scss';
import Slider from 'react-slick';
import { Product } from '@/types';
import Image from '../../../node_modules/next/image';
import Link from '../../../node_modules/next/link';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const NewProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery(null);

  if (isLoading) return <Loading />;

  const newProducts = products?.filter((el: Product) => el?.is_new === true);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    nextArrow: <IoIosArrowForward fill />,
    prevArrow: <IoIosArrowBack fill />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={s.new_products}>
        <div className={s.container}>
          <h1>Новое поступление.</h1>
          <div className={s.new_products_parent}>
            <Slider {...settings}>
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
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProducts;
