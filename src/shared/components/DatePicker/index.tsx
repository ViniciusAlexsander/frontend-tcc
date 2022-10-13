import React from "react";
import { Dayjs } from "dayjs";
import dayjsLocale from "dayjs/locale/pt-br";
import { TextField, TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DatePicker as DatePickerMui,
  DatePickerProps as DatePickerPropsMui,
} from "@mui/x-date-pickers/DatePicker";

interface DatePickerProps {
  setDatePickerValue: (date: Date | null) => void;
  datePickerValue: Date;
  textFieldProps?: TextFieldProps;
  apenasAno?: boolean;
}

export function DatePicker({
  datePickerValue,
  setDatePickerValue,
  textFieldProps,
  apenasAno = false,
  ...props
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={dayjsLocale}>
      <DatePickerMui
        {...props}
        views={["year"]}
        value={datePickerValue}
        onChange={(newValue) => {
          setDatePickerValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} {...textFieldProps} />}
      />
    </LocalizationProvider>
  );
}
