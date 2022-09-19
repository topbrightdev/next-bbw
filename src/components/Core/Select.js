import React from "react";
import { withTheme } from "styled-components";

import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";

const getCustomStyles = (theme, accentColor, bg, border, indicator) => {
  return {
    dropdownIndicator: () => {
      return {
        display: !indicator && "none",
      };
    },
    indicatorSeparator: () => {},
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? theme.colors[accentColor] : theme.colors.dark,
        textAlign: "left",
        backgroundColor: bg,
      };
    },
    placeholder: (base) => ({
      ...base,

      color: "hsl(0,0%,20%)",
    }),
    control: (provided, state) => {
      return {
        ...provided,
        border: !border
          ? "none"
          : state.menuIsOpen || state.isFocused
          ? `1px solid ${theme.colors[accentColor]} !important`
          : `1px solid ${theme.colors.border} !important`,
        padding: "0.25rem 1rem",
        borderRadius: "4px",
        width: "100%",
        // height: "49px",
        outline: "none",
        boxShadow: "none",
        textAlign: "left",
        backgroundColor: bg,
      };
    },
  };
};
const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};
const SelectStyled = ({
  theme,
  bg = "#fff",
  border = true,
  accentColor = "success",
  name = "item",
  indicator = true,
  defaultValue,
  sendFilters,
  options,
  isMultiSelect,
  placeholder,
  value,
  ...rest
}) => {
  const animatedComponents = makeAnimated();
  return isMultiSelect ? (
    <Select
      name={name}
      styles={getCustomStyles(theme, accentColor, bg, border, indicator)}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      defaultValue={
        defaultValue
          ? defaultValue.map((index) => {
              return options[index];
            })
          : options[defaultValue]
      }
      value={value}
      onChange={sendFilters}
    />
  ) : (
    <Select
      components={{ Placeholder }}
      name={name}
      styles={getCustomStyles(theme, accentColor, bg, border, indicator)}
      defaultValue={defaultValue ? options[defaultValue] : options[0]}
      value={value}
      options={options}
      instanceId="inId"
      onChange={sendFilters}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default withTheme(SelectStyled);
