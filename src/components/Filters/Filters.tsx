import { useEffect, useState } from 'react';
import s from '../Filters/styles.module.scss';

import { CgMenuGridO } from 'react-icons/cg';
import { VscServerProcess } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import { useGetProductsQuery } from '@/redux/api/productApi';
import Search from '../Search/Search';

const Filters = () => {
  const { data: categories } = useGetCategoriesQuery(null);
  const { data: products } = useGetProductsQuery(null);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  if (search.length)
    document.body.addEventListener('click', () => {
      setSearch('');
    });

  useEffect(() => {
    const handleRouteChange = () => {
      setExpanded(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const productSearch = products?.filter((el) => {
    return el?.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleChange = () => setExpanded(!expanded);

  return (
    <>
      <div className={s.filters}>
        <div className={s.container}>
          <div className={s.filters_main}>
            <Accordion
              className={s.filters_accordion}
              expanded={expanded}
              onChange={handleChange}
            >
              <AccordionSummary
                expandIcon={<CgMenuGridO className={s.filter_icon} />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography className={s.filters_title}>
                  Каталог товаров
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {categories?.map(
                  (el) =>
                    !el?.parent_category && (
                      <Link
                        key={el?.id}
                        href={`/categories/${el?.id}`}
                        className={s.filters_twise}
                      >
                        <VscServerProcess />
                        <h4>{el?.name}</h4>
                      </Link>
                    )
                )}
              </AccordionDetails>
            </Accordion>
            <div className={s.search_desk}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={s.filters_input}
                type='text'
                placeholder='Название товара...'
              />
              <div
                style={{ display: search.length ? 'block' : 'none' }}
                className={s.filters_result_box}
              >
                <ul>
                  {productSearch?.length ? (
                    productSearch?.map((el) => {
                      return (
                        <li key={el?.id}>
                          <Link href={`/products/${el?.id}`}>
                            <img src={el?.image} alt='' />
                            {el?.name.length <= 58 ? (
                              <p>{el?.name}</p>
                            ) : (
                              <p>
                                {el?.name.slice(0, 58)}
                                {'...'}
                              </p>
                            )}
                            <p>{el?.price.toLocaleString()} сум</p>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <b>Не найдено</b>
                  )}
                </ul>
              </div>
            </div>
            <div className={s.search_mob}>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
