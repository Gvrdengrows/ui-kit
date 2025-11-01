import s from "./App.module.scss";
import Toggler from "./components/Toggler/Toggler";

const App = () => {
  const onToggle = (index: number) => {
    console.log(index);
  };
  return (
    <>
      <div className={s.app}>
        <Toggler onToggle={onToggle} togglers={["Игры", "кино", "музыка"]} />
      </div>
    </>
  );
};

export default App;
