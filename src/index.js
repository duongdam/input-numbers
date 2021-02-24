import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import "antd/dist/antd.css";
import styles from "./styles.module.css";
import { ReactComponent as Reduce } from "./giam.svg";
import { ReactComponent as Increase } from "./tang.svg";

export const CLFInputNumber = ({
                                 imgComponent = null,
                                 value = 1,
                                 min = 1,
                                 max = 36,
                                 callBack = null,
                                 color = "red",
                                 maxWidth = 250,
                                 width = "100%",
                                 height = 35,
                                 marginIMG = "0px 10px",
                                 marginButton = "10px auto",
                                 step = 1,
                                 autoFocus = false
                               }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onBlur = (action) => {
    let oldInputValue = inputValue;
    if (action === "add") {
      if (inputValue + step > max)
        return setInputValue(oldInputValue);

      oldInputValue = inputValue + step;
      setInputValue(oldInputValue);
    }

    if (action === "remove") {
      if (inputValue - step < min)
        return setInputValue(oldInputValue);

      oldInputValue = inputValue - step;
      setInputValue(oldInputValue);
    }

    if (action === "auto") {
      if (inputValue > max || inputValue < min || !Number(inputValue))
        return setInputValue(value);
    }

    if (callBack) {
      callBack(oldInputValue);
    }
  };

  return (
    <div className={`${styles.clfRoot} ${styles.clfFlex}`}
         style={{ maxWidth: `${maxWidth}px`, margin: marginButton }}>
      {
        imgComponent ?
          {
            ...imgComponent,
            props: {
              ...imgComponent.props,
              style: {
                ...imgComponent.props.style,
                maxWidth: `${0.7 * height}px`,
                maxHeight: `${0.7 * height}px`,
                margin: marginIMG
              }
            }
          } :
          null
      }
      <div
        className={styles.clfNumber}
        style={{ width, height: `${height}px` }}
      >
        <Reduce
          className={`${styles.clfCursorPointer} ${styles.clfImg}`}
          onClick={() => onBlur("remove")}
          alt="Reduce"
        />
        <InputNumber
          min={min}
          max={max}
          autoFocus={autoFocus}
          value={inputValue}
          step={step}
          onChange={inputValue => {
            if (!Number(inputValue))
              return setInputValue(value);
            setInputValue(inputValue);
          }}
          onStep={(value, info) => {
            if (info.type === "up") {
              onBlur("add");
            } else {
              onBlur("remove");
            }
          }}
          onBlur={() => onBlur("auto")}
          onPressEnter={() => onBlur("auto")}
          className={`${styles.clfNoBorder} ${styles.clfInput}`}
          style={{ color }}
        />
        <Increase
          className={`${styles.clfCursorPointer} ${styles.clfImg}`}
          onClick={() => onBlur("add")}
          alt="Increase"
        />
      </div>
    </div>
  );
};
