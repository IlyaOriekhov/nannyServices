import { useDispatch, useSelector } from "react-redux";
import { selectColorTheme } from "../../redux/colorTheme/selectors";
import { changeColor } from "../../redux/colorTheme/colorThemeSlice";
import styles from "./ChangeColor.module.css";

export const ChangeColor = () => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(selectColorTheme);

  const colors = [
    { name: "red", hex: "#f03f3b" },
    { name: "blue", hex: "#0957c3" },
    { name: "green", hex: "#103931" },
  ];

  const handleClick = (colorName) => {
    dispatch(changeColor(colorName));
  };

  return (
    <div className={styles.colorOptions}>
      {colors.map((colorObj) => (
        <button
          key={colorObj.name}
          onClick={() => handleClick(colorObj.name)}
          className={`${styles.circle} ${
            selectedColor === colorObj.name ? styles.active : ""
          }`}
          style={{ backgroundColor: colorObj.hex }}
          aria-label={`Select ${colorObj.name} theme`}
        />
      ))}
    </div>
  );
};
