"use-client";
import React, { FC, useEffect } from "react";
import s from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Nav: FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className={s.nav}>
        <div className={s.top__nav}>
          <div className={s.container}>
            <div className={s.top__nav__parent}>
              <div className={s.mobile__drawer}>
                <HiMenu className={s.mobile__toggle} onClick={toggleDrawer} />

                <Drawer
                  open={isOpen}
                  onClose={toggleDrawer}
                  direction="left"
                  size={"80%"}
                  className="bla bla bla"
                >
                  <div className={s.mobil_nav_parent}>
                    <Link href="/">
                      <Image
                        className={s.logo}
                        width={200}
                        height={100}
                        src="/x-net.png"
                        alt="Logo"
                      />
                    </Link>
                    <div className={s.mobile_routes}>
                      <Link href={"/"}>Главная Страница</Link>
                      <Link href={"/"}>Товары</Link>
                      <Link href={"/"}>Контакты</Link>
                      <a target="_blank" href="tel: +998 99 855-73-85">
                        Отдел продаж: <br /> +998 99 855-73-85
                      </a>
                    </div>
                  </div>
                </Drawer>
              </div>
              <Link href="/">
                <Image
                  className={s.logo}
                  width={200}
                  height={100}
                  src="/x-net.png"
                  alt="Logo"
                />
              </Link>
              <div className={s.nav__center}>
                <Link href={"/"}>Главная Страница</Link>
                <Link href={"/"}>Товары</Link>
                <Link href={"/"}>Контакты</Link>
                <a target="_blank" href="tel: +998 99 855-73-85">
                  Отдел продаж: +998 99 855-73-85
                </a>
              </div>
              <div className={s.nav__right}>
                <HiShoppingCart className={s.shop__cart} />
                <sub>0</sub>
              </div>
            </div>
          </div>
        </div>
        <div className={s.bottom__nav__parent}></div>
      </nav>
    </>
  );
};

export default Nav;
