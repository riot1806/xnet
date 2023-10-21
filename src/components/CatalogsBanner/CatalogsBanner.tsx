import React, { FC, useEffect, useState } from "react";
import s from "../CatalogsBanner/styles.module.scss";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { catalogs_banner } from "../../catalogs_banner";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import axios from "../../../node_modules/axios/index";
import { API_KEY } from "@/api/Api";
import { Banner } from "@/types";
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
      },
    },
  ],
};

const CatalogsBanner: FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .get<Banner[]>(`${API_KEY}/banners/`)
      .then((res) => {
        setBanners(res.data);
        setLoad(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const isCatalogBanner = banners?.filter(
    (el) => el?.is_catalog_banner === true
  );

  if (load) return <Loading />;
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
