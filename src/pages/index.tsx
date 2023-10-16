"use-client";
import s from "../styles/home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import { banners } from "@/banners";
import Image from "next/image";
import AboutUs from "@/components/AboutUs/AboutUs";
import CatalogsBanner from "@/components/CatalogsBanner/CatalogsBanner";
import Filters from "@/components/Filters/Filters";
import axios from "axios";
import { API_KEY } from "../api/Api";
import { useEffect, useState } from "react";
import { Banner } from "@/types";
import Categories from "@/components/Categories/Categories";

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

  useEffect(() => {
    axios
      .get<Banner[]>(`${API_KEY}/banners`)
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <Filters />
      <div className={s.home_header}>
        <div className={s.container}>
          <h1>Телекоммуникационное обородувание</h1>
          <Slider {...settings}>
            {banners?.map((el) => (
              <div key={el?._id} className={s.home_banner}>
                <Image fill src={el?.image} alt="banner" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Categories />
      <CatalogsBanner />
      <AboutUs />
    </>
  );
}
