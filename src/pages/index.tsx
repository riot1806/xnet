"use client";
import s from "../styles/home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import AboutUs from "@/components/AboutUs/AboutUs";
import Filters from "@/components/Filters/Filters";
import axios from "axios";
import { API_KEY } from "../api/Api";
import { useEffect, useState } from "react";
import { Banner } from "@/types";
import Categories from "@/components/Categories/Categories";
import Loading from "@/components/Loading";

const settings = {
  dots: true,
  fade: true,
  arrows: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  cssEase: "linear",
};

export default function Home() {
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


  const isCatalogBanner = banners?.filter((el) => el?.is_catalog_banner === false)

  if (load) return <Loading />;

  return (
    <>
      <div className={s.home_header}>
        <div className={s.container}>
          <h1>Телекоммуникационное обородувание</h1>
          <Slider {...settings}>
            {isCatalogBanner?.map((el) => (
              <div key={el?.id} className={s.home_banner}>
                <Image fill src={el?.image} alt="banner" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Categories />
      <AboutUs />
    </>
  );
}
