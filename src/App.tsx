import s from "./App.module.scss";
import Tabs from "./components/Tabs/Tabs";

const App = () => {
  const onToggle = (index: number) => {
    console.log(index);
  };
  return (
    <>
      <div className={s.app}>
        <div>
          Without mobile adapt
          <Tabs onToggle={onToggle} togglers={["Игры", "кино", "музыка"]} />
        </div>
        <div>
          With mobile adapt
          <Tabs
            mode="buttons"
            onToggle={onToggle}
            togglers={["Игры", "кино", "музыка"]}
          />
        </div>
      </div>
    </>
  );
};

export default App;
