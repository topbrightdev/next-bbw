const InputField = ({ name, value, label, handleChange, loading, ...rest }) => {
  return (
    <input
      className="mt-4 profile-settings-input px-10 text-dark font-weight-bold"
      name={name}
      placeholder={label}
      value={value}
      onChange={handleChange}
      disabled={loading}
      {...rest}
    />
  );
};

export default InputField;
