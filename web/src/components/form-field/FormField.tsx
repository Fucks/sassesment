import { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import { useField, useFormikContext } from "formik";
import { Fragment, FunctionComponent, useEffect } from "react";
import TextField from '@atlaskit/textfield';

export interface FormFieldProps {
    name: string;
    label: string;
    required?: boolean
}

const FormField: FunctionComponent<FormFieldProps> = ({ name, label, required }: FormFieldProps) => {

    const [field, meta, helpers] = useField(name);

    console.log(field, meta, helpers)

    return (<Field
        name={name}
        label={label}
        isRequired={required}>

        {({ fieldProps }) => (
            <>
                <TextField {...fieldProps} {...field} />
                {meta.error && (
                    <ErrorMessage>
                        {meta.error}
                    </ErrorMessage>
                )}
            </>
        )}
    </Field>);
}

export default FormField;