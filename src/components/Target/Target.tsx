import React, { FC } from "react";
import s from "../Target/target.module.scss";
import Image from "../../../node_modules/next/image";

const Target: FC = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.target_main}>
          <div className={s.target_main_card}>
            <Image fill src="/delivery.webp" alt="Benefits" />
            <p>
              Бесплатная <br /> доставка
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src="/bonus.webp" alt="Benefits" />
            <p>
              Бонусы за <br /> покупку
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src="/return.png" alt="Benefits" />
            <p>
              Гарантированный <br /> возврат и обмен
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src="/checklist.png" alt="Benefits" />
            <p>
              Сертификаты на <br /> все товары
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src="/agreement.png" alt="Benefits" />
            <p>
              Сервисное <br /> обслуживание
            </p>
          </div>
          <div className={s.target_main_card}>
            <Image fill src="/help.png" alt="Benefits" />
            <p>
              Техническая <br /> поддержка <br /> 24/7
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Target;
