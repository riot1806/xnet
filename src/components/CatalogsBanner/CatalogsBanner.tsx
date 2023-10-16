import React, { FC } from "react";
import s from "../CatalogsBanner/styles.module.scss";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { catalogs_banner } from "../../catalogs_banner";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
      },
    },
  ],
};

const CatalogsBanner: FC = () => {
  return (
    <>
      <div className={s.catalogs_banner}>
        <div className={s.container}>
          <Slider {...settings}>
            {catalogs_banner?.map((el) => (
              <div key={el?.id} className={s.catalogs_banner}>
                <Image fill src={el?.url} alt="banner" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CatalogsBanner;
