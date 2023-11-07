import { useEffect, useState } from 'react';
import s from '../Search/styles.module.scss';
import 'react-modern-drawer/dist/index.css';

import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import Drawer from 'react-modern-drawer';
import Link from 'next/link';

import { useGetProductsQuery } from '@/redux/api/productApi';
import { Product } from '@/types';

const Search = () => {
  const { data: products } = useGetProductsQuery(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchMob, setSearchMob] = useState('');
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
    setSearchMob('');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  const productSearch = products?.filter((el:Product) => {
    return el?.name.toLowerCase().includes(searchMob.toLowerCase());
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    }

    if (!isOpen) {
      document.body.style.overflowY = 'scroll';
    }
  }, []);

  return (
    <>
      {/* <div className={s.container}> */}
      <AiOutlineSearch onClick={toggleDrawer} className={s.search_icon} />
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='bla bla bla'
        size={'100%'}
      >
        <div className={s.search_comp}>
          <div className={s.search_comp_labels}>
            <span>
              <BsArrowLeft onClick={toggleDrawer} className={s.back_label} />
            </span>
            <h1>Поиск</h1>
            <span></span>
          </div>
          <div className={s.search_comp_input}>
            <input
              value={searchMob}
              onChange={(e) => setSearchMob(e.target.value)}
              type='text'
              placeholder='Название товара...'
            />
          </div>
          <div
            style={{ display: searchMob.length ? 'block' : 'none' }}
            className={s.filters_result_box}
          >
            <ul>
              {productSearch?.length ? (
                productSearch?.map((el:Product) => {
                  return (
                    <Link href={`/tovar/${el?.id}`} key={el?.id}>
                      <img src={el?.image} alt='' />
                      {el?.name.length <= 58 ? (
                        <p>{el?.name}</p>
                      ) : (
                        <p>
                          {el?.name.slice(0, 58)}
                          {'...'}
                        </p>
                      )}
                      <p className={s.filters_result_box_price}>
                        {el?.price.toLocaleString()} сум
                      </p>
                    </Link>
                  );
                })
              ) : (
               <>
               <br />
                <b>Не найдено</b>
               </>
              )}
            </ul>
          </div>
        </div>
      </Drawer>
      {/* </div> */}
    </>
  );
};

export default Search;
