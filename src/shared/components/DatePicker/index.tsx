import React from "react";
import { Dayjs } from "dayjs";
import { TextField, TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DatePicker as DatePickerMui,
  DatePickerProps as DatePickerPropsMui,
} from "@mui/x-date-pickers/DatePicker";

interface DatePickerProps {
  setDatePickerValue: React.Dispatch<React.SetStateAction<Dayjs>>;
  datePickerValue: Dayjs;
  textFieldProps?: TextFieldProps;
}

export function DatePicker({
  datePickerValue,
  setDatePickerValue,
  textFieldProps,
  ...props
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerMui
        {...props}
        value={datePickerValue}
        onChange={(newValue) => {
          setDatePickerValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} {...textFieldProps} />}
      />
    </LocalizationProvider>
  );
}
