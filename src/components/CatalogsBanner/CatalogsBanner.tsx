import s from "../CatalogsBanner/styles.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Slider from "react-slick";

import { useGetBannersQuery } from "@/redux/api/bannerApi";
import Loading from "../Loading";

const settings = {
  dots: false,
  fade: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
  nextArrow: <IoIosArrowForward fill />,
  prevArrow: <IoIosArrowBack fill />,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        arrows: false,
        dots: true,
      },
    },
  ],
};

const CatalogsBanner = () => {
  const { data: banners, isLoading } = useGetBannersQuery(null);

  const isCatalogBanner = banners?.filter(
    (el) => el?.is_catalog_banner === true,
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={s.catalogs_banner}>
        <div className={s.container}>
          <Slider {...settings}>
            {isCatalogBanner?.map((el) => (
              <div key={el?.id} className={s.catalogs_banner}>
                <Image fill src={el?.image} alt="catalog-banner" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CatalogsBanner;
