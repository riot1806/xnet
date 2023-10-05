import React, { FC } from "react";
import s from "../Footer/styles.module.scss";
import Link from "next/link";
import { BsFillTelephoneFill } from "react-icons/bs";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <>
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footer_main}>
            <Image fill src="/x-logo.png" alt="Logo" />
            <div className={s.item}>
              <h2>О компании</h2>
              <p className={s.footer_about_us}>
                Компания «X-net» была создана в 2012 году. Мы занимаемся
                поиском, разработкой и внедрением готовых IT-решений;
                осуществляем комплексные поставки оборудования.
              </p>
            </div>
            <div className={s.item}>
              <h2>Навигация</h2>
              <Link href={"/"}>
                <p>Главная Страница</p>
              </Link>
              <Link href={"/products"}>
                <p>Товары</p>
              </Link>
              <Link href={"/contacts"}>
                {" "}
                <p>Контакты</p>
              </Link>
            </div>
            <div className={s.item}>
              <h2>Контакты</h2>
              <a target="_blank" href="tel: +998998557385" className={s.twink}>
                <BsFillTelephoneFill className={s.twink_phone} />
                <p>+998 (97) 198-98-89 Xusan</p>
              </a>
              <div className={s.twink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <p>
                  Учувчулар шахарчаси 1, <br /> 10016 Ташкент
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className={s.footer_main_bottom}>
            <p className={s.footer_main_bottom_title}>© 2012-2023 «X-net» - продажа сетевого оборудования</p>
            <p>
              Developed by{" "}
              <a
                style={{ color: "#0C96F3" }}
                target="_blank"
                href="https://it-academy.uz/"
              >
                IT Academy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
