import { useRef } from "react";
import s from "./App.module.scss";
import Tabs from "./components/Tabs/Tabs";

const App = () => {
  const tabs = useRef<{ onToggle: (index: number) => void }>(null);

  const onToggle = (index: number) => {
    console.log(index);
  };

  const changeTabToSecond = () => {
    if (tabs.current) tabs.current.onToggle(1);
  };
  return (
    <>
      <div className={s.app}>
        <div>
          Classic
          <Tabs onToggle={onToggle} togglers={["Игры", "кино", "музыка"]} />
        </div>
        <div>
          Buttons
          <Tabs
            mode="buttons"
            onToggle={onToggle}
            togglers={["Игры", "кино", "музыка"]}
          />
        </div>
        <div>
          <div>With Control outside</div>
          <button onClick={changeTabToSecond}>Go to second tab</button>
          <Tabs
            ref={tabs}
            onToggle={onToggle}
            togglers={["Игры", "кино", "музыка"]}
          />
        </div>
      </div>
    </>
  );
};

export default App;
