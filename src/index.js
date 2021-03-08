import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import "antd/dist/antd.css";
import { ReactComponent as Reduce } from "./giam.svg";
import { ReactComponent as Increase } from "./tang.svg";
import styled from "styled-components";

const DivInputCustom = styled.div`
  width: 95%;
  align-items: center;
  height: 100%;
  background-color: rgb(241, 241, 241);
  border-radius: 40px;
  padding: 5px;
  display: flex;
  max-width: ${props => props.otherprops.maxWidth};
  margin: ${props => props.otherprops.marginButton};
`;

const DivNumberCustom = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

const ReduceCustom = styled(Reduce)`
  cursor: pointer;
  min-width: 10px
`;

const IncreaseCustom = styled(Increase)`
  cursor: pointer;
  min-width: 10px
`;

const InputNumberCustom = styled(InputNumber)`
  width: 70%;
  border: none;
  color: ${props => props.color};

  & input {
    font-size: 16px;
    font-weight: bold;
  }

  &.ant-input-number-focused {
    border-radius: 15px 0 0 15px;
  }
`;

/**
 *
 * @param imgComponent
 * @param value
 * @param min
 * @param max
 * @param callBack
 * @param color
 * @param maxWidth
 * @param width
 * @param height
 * @param marginIMG
 * @param marginButton
 * @param step
 * @param autoFocus
 * @returns {JSX.Element}
 * @constructor
 */

export const CLFInputNumber = ({
                                 imgComponent = null,
                                 value = 1,
                                 min = 1,
                                 max = 36,
                                 callBack = null,
                                 color = "red",
                                 maxWidth = "250px",
                                 width = "100%",
                                 height = "35px",
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

  const onChange = (inputValue) => {
    if (!Number(inputValue))
      return setInputValue(value);
    setInputValue(inputValue);
  };

  const onStepChange = (value, info) => {
    if (info.type === "up") {
      onBlur("add");
    } else {
      onBlur("remove");
    }
  };

  return (
    <DivInputCustom otherprops={{ maxWidth, marginButton }}>
      {
        imgComponent ?
          {
            ...imgComponent,
            props: {
              ...imgComponent.props,
              style: {
                ...imgComponent.props.style,
                maxWidth: `${0.7 * Number(height.split("px")[0])}`,
                maxHeight: `${0.7 * Number(height.split("px")[0])}`,
                margin: marginIMG
              }
            }
          } :
          null
      }
      <DivNumberCustom width={width} height={height}>
        <ReduceCustom
          onClick={() => onBlur("remove")}
          alt="Reduce"
        />
        <InputNumberCustom
          min={min}
          max={max}
          autoFocus={autoFocus}
          value={inputValue}
          step={step}
          onChange={inputValue => onChange(inputValue)}
          onStep={(value, info) => onStepChange(value, info)}
          onBlur={() => onBlur("auto")}
          onPressEnter={() => onBlur("auto")}
          color={color}
        />
        <IncreaseCustom
          onClick={() => onBlur("add")}
          alt="Increase"
        />
      </DivNumberCustom>
    </DivInputCustom>
  );
};
