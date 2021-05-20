import { ErrorMessage, Field } from "@atlaskit/form";
import { useField } from "formik";
import { Fragment, FunctionComponent } from "react";
import AtlaskitTextArea from '@atlaskit/textarea';

export interface TextAreaProps {
    name: string;
    label: string;
    value?: string;
    required?: boolean
}

const TextArea: FunctionComponent<TextAreaProps> = ({ name, label, required, value }: TextAreaProps) => {

    const [field, meta, helpers] = useField(name);

    return (
        <Field
            name={name}
            label={label}
            defaultValue={value}
            isRequired={required}>

            {() => (
                <Fragment>
                    <AtlaskitTextArea defaultValue={value} onChange={(ev) => helpers.setValue(ev.currentTarget.value)} />
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

export default TextArea;