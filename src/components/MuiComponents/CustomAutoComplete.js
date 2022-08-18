/* eslint-disable eqeqeq */
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import React, { useEffect } from "react";

function CustomAutoComplete({
  defaultProps,
  formProps,
  variant,
  defaultValue,
  size,
  id,
  label,
  name,
  disabled,
  value,
  onChange,
  type,
  multiple,
  filterSelectedOptions,
  options,
  optionLabel,
  arrayObject,
  ...props
}) {
  return (
    <>
      <Autocomplete
        {...defaultProps}
        // options={options}
        // getOptionLabel={(option) => option[optionLabel ?? "name"]}
        multiple={multiple ? true : false}
        id={id ?? name ?? ""}
        disabled={disabled ? true : false}
        name={name ?? ""}
        filterSelectedOptions={filterSelectedOptions ?? false}
        onChange={(event, newValue) => {
          const newValueArray =
            multiple || arrayObject ? newValue : newValue?.id ?? "";
          formProps.setFieldValue(`${name}`, newValueArray);
        }}
        defaultValue={defaultValue}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label ?? ""}
            variant={variant ?? "standard"}
            size={size ?? "small"}
            id={id ?? name ?? ""}
            name={name ?? ""}
            error={formProps?.touched[name] && Boolean(formProps?.errors[name])}
            helperText={formProps?.touched[name] && formProps?.errors[name]}
          />
        )}
      />
    </>
  );
}

export default CustomAutoComplete;
