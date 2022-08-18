import { TextField } from "@material-ui/core";
import React from "react";

function CustomTextField({
  formProps,
  variant,
  size,
  id,
  label,
  name,
  disabled,
  value,
  onChange,
  type,
  ...props
}) {
  return (
    <TextField
      fullWidth
      variant={variant ?? "standard"}
      size={size ?? "small"}
      id={id ?? name ?? ""}
      label={label ?? ""}
      disabled={disabled ? true : false}
      name={name ?? ""}
      type={type ?? "text"}
      value={value ?? formProps?.values[name]}
      onChange={onChange ?? formProps.handleChange}
      error={formProps?.touched[name] && Boolean(formProps?.errors[name])}
      helperText={formProps?.touched[name] && formProps?.errors[name]}
    />
  );
}

export default CustomTextField;
