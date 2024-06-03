import styles from "./TextInputCSS.module.css";
export default function TextInput({ handleChange, children, id }) {
  let inputEle;

  if (id === "availableTimeHour") {
    inputEle = (
      <input
        id={id}
        type="number"
        min="0"
        max="8"
        onChange={handleChange}
        defaultValue="0"
      />
    );
  } else {
    inputEle = (
      <input
        id={id}
        type="number"
        min="0"
        max="59"
        onChange={handleChange}
        defaultValue="0"
      />
    );
  }

  return (
    <div className={styles.textInput}>
      {children}
      {inputEle}
    </div>
  );
}
