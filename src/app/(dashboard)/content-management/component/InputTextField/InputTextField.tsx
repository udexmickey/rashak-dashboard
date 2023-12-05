import { TextField } from "@mui/material";
import React, { ChangeEventHandler } from "react";

interface IInputTextField {
  label: string;
  props?: any;
  value: string;
  maxWidth?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputTextField({
  label,
  props,
  value,
  maxWidth,
  onChange,
}: IInputTextField) {
  return (
    <>
      <TextField
        label={label}
        id={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        className={`mb-4 max-w-[${maxWidth}px] w-full`}
        InputProps={{
          style: {
            borderRadius: "2rem",
          },
        }}
        {...props}
      />
    </>
  );
}
