import { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import { useField, useFormikContext } from "formik";
import { Fragment, FunctionComponent, useEffect } from "react";
import TextField from '@atlaskit/textfield';

export interface FormFieldProps {
    name: string;
    label: string;
    value: any;
    type?: string;
    required?: boolean
}

const FormField: FunctionComponent<FormFieldProps> = ({ name, label, required, value, type }: FormFieldProps) => {

    const [field, meta, helpers] = useField(name);

    return (
        <Field
            name={name}
            label={label}
            defaultValue={value}
            isRequired={required}>

            {() => (
                <Fragment>
                    <TextField type={type || 'text'} defaultValue={value} onChange={(ev) => helpers.setValue(ev.currentTarget.value)} />
                    {meta.error && (
                        <ErrorMessage>
                            {meta.error}
                        </ErrorMessage>
                    )}
                </Fragment>
            )}
        </Field>
    );
}

export default FormField;