import { FC } from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

interface RangeSliderProps {
  defaultValue: [number, number];
  min: number;
  max: number;
  pill?: boolean;
  valueFormatter: Function;
  onChange: Function;
}

const StyledSlider = styled(ReactSlider)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5px;
`;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => {
    // @ts-ignore
    return props.index === 1 ? "#2b3940" : "#ddd";
  }};
  border-radius: 999px;
`;

const StyledThumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  background-color: #2b3940;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const StyledRoundThumb = styled(StyledThumb)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const StyledPillThumb = styled(StyledThumb)`
  padding: 8px, 9px, 8px, 9px;
  height: 30px;
  width: 50px;
  border-radius: 20px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const renderThumb = (props, state, pill, valueFormatter) => {
  const value = valueFormatter ? valueFormatter(state.valueNow) : state.valueNow;
  return pill ? <StyledPillThumb {...props}>{value}</StyledPillThumb> : <StyledRoundThumb {...props}>{value}</StyledRoundThumb>;
};

const RangeSlider: FC<RangeSliderProps> = ({ defaultValue, min, max, pill, valueFormatter, onChange }) => {
  return (
    <StyledSlider
      ariaLabel={["Lower thumb", "Upper thumb"]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      min={min}
      max={max}
      // @ts-ignore
      defaultValue={defaultValue}
      renderTrack={Track}
      renderThumb={(props, state) => renderThumb(props, state, pill, valueFormatter)}
      pearling
      minDistance={10}
      onAfterChange={(value, index) => onChange(value, index)}
    />
  );
};

export default RangeSlider;
