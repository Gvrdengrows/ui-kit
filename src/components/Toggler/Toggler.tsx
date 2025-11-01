import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "./Toggler.module.scss";

interface Props {
  togglers: string[];
  onToggle: (toggleIndex: number) => void;
  isMobileAdapt?: boolean;
}

const Toggler = forwardRef(function Toggler(
  { togglers, onToggle, isMobileAdapt = false }: Props,
  ref
) {
  const percent = 100 / togglers.length;
  const calculatePosition = (i: number) => {
    return `${percent * i}%`;
  };
  const [position, setPosition] = useState({
    left: calculatePosition(0),
  });
  const [activeToggle, setActiveToggle] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    setIsMobile(window.innerWidth < 967);
  }, []);

  const handleClick = (toggleIndex: number) => {
    onToggle(toggleIndex);
    const newPosition = calculatePosition(toggleIndex);
    setPosition({ left: newPosition });
    setActiveToggle(toggleIndex);
  };

  useImperativeHandle(ref, () => {
    return {
      onToggle: (toggleIndex: number) => {
        handleClick(toggleIndex);
      },
    };
  });

  return isMobileAdapt && isMobile ? (
    <div className={styles.toggler_mobile}>
      {togglers.map((toggle, i) => (
        <div
          className={`${styles.toggler_mobile__item} ${
            activeToggle === i
              ? styles.toggler_mobile__item_active
              : styles.toggler_mobile__item_unactive
          }`}
          onClick={() => handleClick(i)}
          key={i}
        >
          {toggle}
        </div>
      ))}
    </div>
  ) : (
    <div className={styles.carousel}>
      <div className={styles.toggler}>
        {togglers.map((toggle, i) => (
          <div
            className={`${styles.toggler__item}`}
            onClick={() => handleClick(i)}
            key={i}
          >
            {toggle}
          </div>
        ))}
        <div
          className={styles.active}
          style={{ ...position, width: `calc(100% / ${togglers.length})` }}
        />
      </div>
    </div>
  );
});

export default Toggler;
