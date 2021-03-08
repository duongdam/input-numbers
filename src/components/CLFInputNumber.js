import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import "antd/lib/input-number/style/css";
import { ReactComponent as Reduce } from "../giam.svg";
import { ReactComponent as Increase } from "../tang.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

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

  &.ant-input-number-disabled {
    background-color: transparent;
  }
`;

/**
 *
 * @param imgComponent
 * @param value
 * @param min
 * @param max
 * @param callBack
 * @param step
 * @param width
 * @param height
 * @param disabled
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */


const CLFInputNumber = ({
                          imgComponent,
                          value,
                          min,
                          max,
                          callBack,
                          step,
                          width,
                          height,
                          disabled,
                          ...rest
                        }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onBlur = (action) => {
    if (disabled || rest.readOnly)
      return;
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
    if (disabled || rest.readOnly)
      return;
    if (!Number(inputValue))
      return setInputValue(value);
    setInputValue(inputValue);
  };

  const onStepChange = (value, info) => {
    if (disabled || rest.readOnly)
      return;
    if (info.type === "up") {
      onBlur("add");
    } else {
      onBlur("remove");
    }
  };

  return (
    <DivInputCustom otherprops={{
      maxWidth: rest.maxWidth,
      marginButton: rest.marginButton
    }} {...rest}>
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
                margin: rest.marginIMG
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
          autoFocus={rest.autoFocus}
          value={inputValue}
          step={step}
          onChange={inputValue => onChange(inputValue)}
          onStep={(value, info) => onStepChange(value, info)}
          onBlur={() => onBlur("auto")}
          onPressEnter={() => onBlur("auto")}
          color={rest.color}
          disabled={disabled}
          readOnly={rest.readOnly}
        />
        <IncreaseCustom
          onClick={() => onBlur("add")}
          alt="Increase"
        />
      </DivNumberCustom>
    </DivInputCustom>
  );
};

CLFInputNumber.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imgComponent: PropTypes.element,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  callBack: PropTypes.func,
  color: PropTypes.string,
  maxWidth: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  marginIMG: PropTypes.string,
  marginButton: PropTypes.string,
  step: PropTypes.number,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};

CLFInputNumber.defaultProps = {
  id: null,
  imgComponent: null,
  value: 1,
  min: 1,
  max: 36,
  callBack: null,
  color: "red",
  maxWidth: "250px",
  width: "100%",
  height: "35px",
  marginIMG: "0px 10px",
  marginButton: "10px auto",
  step: 1,
  autoFocus: false,
  disabled: false,
  readOnly: false
};

export default CLFInputNumber;
