'use client';
import React, { FC, useEffect } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { HiShoppingCart } from 'react-icons/hi';
import { HiMenu } from 'react-icons/hi';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/router';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BiLogoTelegram } from 'react-icons/bi';
import { HiMail } from 'react-icons/hi';

const Nav: FC = () => {
  const router = useRouter();
  const { items } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return (
    <>
      <nav className={s.nav}>
        <div className={s.top__nav}>
          <div className={s.container}>
            <div className={s.top__nav__parent}>
              <div className={s.mobile__drawer}>
                <HiMenu
                  style={{ cursor: 'pointer' }}
                  className={s.mobile__toggle}
                  onClick={toggleDrawer}
                />

                <Drawer
                  open={isOpen}
                  onClose={toggleDrawer}
                  direction='left'
                  size={'80%'}
                  className='bla bla bla'
                >
                  <div className={s.mobil_nav_parent}>
                    <Link href='/'>
                      <Image
                        className={s.logo_mobile}
                        fill
                        src='/x-logo.png'
                        alt='Logo'
                      />
                    </Link>
                    <div className={s.mobile_routes}>
                      <Link href={'/'}>Главная Страница</Link>
                      <Link href={'/products'}>Товары</Link>
                      <hr />
                      <span>
                        <a
                          className={s.tg_link}
                          target='_blank'
                          href='https://t.me/xnecom'
                        >
                          <BiLogoTelegram />
                          <p>X NET</p>
                        </a>
                      </span>
                      <span>
                        <a
                          className={s.tg_link}
                          target='_blank'
                          href='mailto:info@xnet.uz'
                        >
                          <HiMail />
                          <p>info@xnet.uz</p>
                        </a>
                      </span>
                      <span>
                        <a
                          target='_blank'
                          href='tel: +998971989889'
                          className={s.twink}
                        >
                          <BsFillTelephoneFill className={s.twink_phone} />
                          <p>+998 (33) 198-98-89 Хусан</p>
                        </a>
                        <br />
                        <a
                          target='_blank'
                          href='tel: +998971988998'
                          className={s.twink}
                        >
                          <BsFillTelephoneFill className={s.twink_phone} />
                          <p>+998 (33) 189-89-98 Хасан</p>
                        </a>
                      </span>
                    </div>
                  </div>
                </Drawer>
              </div>
              <Link href='/'>
                <Image className={s.logo} fill src='/x-logo.png' alt='Logo' />
              </Link>
              <div className={s.nav__center}>
                <Link className={s.nav_center_link} href={'/'}>
                  Главная Страница
                </Link>
                <Link className={s.nav_center_link} href={'/products'}>
                  Товары
                </Link>
                <span>
                  <a
                    className={s.tg_link}
                    target='_blank'
                    href='https://t.me/xnecom'
                  >
                    <BiLogoTelegram />
                    <p>X NET</p>
                  </a>
                </span>
                <span>
                  <a
                    className={s.tg_link}
                    target='_blank'
                    href='mailto:info@xnet.uz'
                  >
                    <HiMail />
                    <p>info@xnet.uz</p>
                  </a>
                </span>
                <span>
                  <a
                    target='_blank'
                    href='tel: +998331989889'
                    className={s.twink}
                  >
                    <BsFillTelephoneFill className={s.twink_phone} />
                    <p>+998 (33) 198-98-89 Хусан</p>
                  </a>
                  <a
                    target='_blank'
                    href='tel: +998331898998'
                    className={s.twink}
                  >
                    <BsFillTelephoneFill className={s.twink_phone} />
                    <p>+998 (33) 189-89-98 Хасан</p>
                  </a>
                </span>
              </div>
              <Link href={'/cart'} className={s.nav__right}>
                <HiShoppingCart className={s.shop__cart} />
                <span suppressHydrationWarning>{items.length}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.bottom__nav__parent}></div>
      </nav>
    </>
  );
};

export default Nav;
