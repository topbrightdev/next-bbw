const ScheduleSteps = ({ stepNumber }) => {
  stepNumber;
  return (
    <h4 className="font-size-6 font-weight-bold">
      Step <span className="text-black-2">{stepNumber}</span> &nbsp; <span className="text-gray">/ &nbsp;</span>
      <span className="text-gray">2</span>
    </h4>
  );
};

export default ScheduleSteps;
