import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./Tabs.module.scss";

interface Props {
  togglers: string[];
  onToggle: (toggleIndex: number) => void;
  mode?: "classic" | "buttons" | "squared";
}

const Tabs = forwardRef(function Toggler(
  { togglers, onToggle, mode = "classic" }: Props,
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

  return mode === "buttons" ? (
    <div className={styles.tabs_mobile}>
      {togglers.map((toggle, i) => (
        <div
          className={`${styles.tabs_mobile__item} ${
            activeToggle === i
              ? styles.tabs_mobile__item_active
              : styles.tabs_mobile__item_unactive
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
      <div className={styles.tabs}>
        {togglers.map((toggle, i) => (
          <div
            className={`${styles.tabs__item}`}
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

export default Tabs;
