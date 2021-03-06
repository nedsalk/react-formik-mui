import * as React from "react";
import { FastFieldProps } from "formik";
import {
  KeyboardDateTimePicker,
  MuiPickersContext
} from "@material-ui/pickers";
import { KeyboardDateTimePickerProps } from "@material-ui/pickers/DateTimePicker/DateTimePicker";
import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
import { FormikField } from "./FormikField";
import { hasError, getHelperText } from "./utils";

interface IBaseProps {
  name: string;
  label?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  useField?: boolean;
  value?: any;
  onChange?: (date: any, value?: string | null) => void;
  formHelperTextProps?: FormHelperTextProps;
  fieldProps?: {};
  validate?: any;
}

export type FormikDateTimepickerProps = IBaseProps &
  Omit<KeyboardDateTimePickerProps, "onChange" | "value">;

const defaultProps = {
  margin: "normal" as "normal",
  style: { minWidth: "240px" },
  format: "dd.MM.yyyy HH:mm",
  placeholder: "tt.mm.jjjj",
  autoOk: true,
  ampm: false,
  variant: "inline" as "inline"
};

export function FormikDateTimepicker(props: FormikDateTimepickerProps) {
  const {
    name,
    error,
    useField,
    helperText,
    formHelperTextProps,
    fieldProps,
    validate,
    ...others
  } = props;

  // Check context for moment/datefns because formats are different
  const context = React.useContext(MuiPickersContext);

  if (context && context.constructor) {
    if (context.constructor.name === "MomentUtils") {
      defaultProps.format = "DD.MM.YYYY HH:mm";
    }
    if (context.constructor.name === "DateFnsUtils") {
      defaultProps.format = "dd.MM.yyyy HH:mm";
    }
  }
  return (
    <FormikField
      name={name}
      useField={useField}
      validate={validate}
      {...fieldProps}
    >
      {({ field, form }: FastFieldProps<any>) => (
        <React.Fragment>
          <KeyboardDateTimePicker
            {...defaultProps}
            variant="inline"
            {...field}
            value={field.value || null}
            onChange={(date: any) => {
              form.setFieldValue(name, date);
            }}
            error={hasError(name, form, error)}
            helperText={getHelperText(name, form, helperText)}
            {...others}
          />
        </React.Fragment>
      )}
    </FormikField>
  );
}
