/* eslint-disable eqeqeq */
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import React, { useEffect } from "react";

function CustomAutoMutipleComplete({
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
  ...props
}) {
  //   const [open, setOpen] = React.useState(false);

  const exceptServiceFuction = (array, excluded) => {
    const result = [];
    array.map((item) => {
      let findItem = excluded.find((x) => x.id == item.id);
      if (!findItem) result.push(item);
    });
    console.log("result", result);
    // setOpen(true);
    return result;
  };

  useEffect(() => {
    exceptServiceFuction(options, defaultValue);
  }, []);

  return (
    <>
      <Autocomplete
        {...defaultProps}
        options={exceptServiceFuction(options, defaultValue)}
        getOptionLabel={(option) => option[optionLabel ?? "name"]}
        multiple={multiple ? true : false}
        id={id ?? name ?? ""}
        disabled={disabled ? true : false}
        name={name ?? ""}
        filterSelectedOptions={filterSelectedOptions ?? false}
        onChange={(event, newValue) => {
          defaultValue = newValue;
          const newValueArray =
            multiple && defaultValue
              ? exceptServiceFuction(newValue, defaultValue)
              : multiple
              ? newValue
              : newValue?.id ?? "";

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

export default CustomAutoMutipleComplete;
