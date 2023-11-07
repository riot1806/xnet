import React, { FC } from "react";
import s from "../AboutUs/about.module.scss";

const AboutUs: FC = () => {
  return (
    <>
      <div className={s.home_about}>
        <div className={s.container}>
          <div className={s.home_about_contents}>
            <h2>Интернет-магазин сетевого оборудования x-net.uz</h2>
            <p>
              x-net.uz – перспективная и развивающаяся компания. Начиная с 2022
              года, наша компания активно занимается поиском, разработкой и
              внедрением готовых IT-решений. Мир не стоит на месте и потребность
              в сетевом и телекоммуникационном оборудовании растет с каждым
              днем. Что бы обеспечить качественную и бесперебойную работу
              коммуникационных систем, наша компания предлагает оборудование
              высокого качества сборки. <br />
              <br /> На нашем сайте вы найдете широкий ассортимент сетевого
              оборудования, такого как: коммутаторы; маршрутизаторы;
              телекоммуникационные шкафы; оптические патч-корды и кабели;
              беспроводное оборудование; оптические кроссы и муфты. Вся
              предлагаемая продукция сертифицирована и лицензирована.
            </p>
            <h2>Почему стоит выбрать наш интернет-магазин?</h2>
            <p>
              Наша компания активно сотрудничает с зарубежными партнерами, что в
              свою очередь обеспечивает своевременную поставку сетевого
              оборудования на наш склад в Узбекистане. Благодаря этому
              достигается высокая оперативность при выполнении заказов любых
              объемов. Для наших клиентов мы предлагаем: выгодные цены; большой
              выбор товаров в наличии; программу лояльности.
              <br />
              <br />
              Наша основная цель – учесть все IT-потребности предприятий и
              обеспечить их качественным сетевым оборудованием максимально
              быстро и недорого.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
