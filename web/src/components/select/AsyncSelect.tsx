import { ErrorMessage, Field } from "@atlaskit/form";
import { FunctionComponent, useEffect, useState } from "react";
import { AsyncSelect as AtlaskitAsyncSelect, OptionType, ValueType } from '@atlaskit/select'
import { useField } from "formik";

export interface SelectOption {
    label?: string;
    value: any
}

export interface AsyncSelectProps {
    name: string;
    label: string;
    required?: boolean;
    value?: SelectOption
    fetch: (filter: string) => Promise<SelectOption[]>
}

const AsyncSelect: FunctionComponent<AsyncSelectProps> = ({ name, value, label, required, fetch }: AsyncSelectProps) => {

    const [field, meta, helpers] = useField(name);

    const [selected, setSelected] = useState({ label: meta.initialValue?.name, value: meta.initialValue });

    useEffect(() => {
        setSelected({ label: field.value?.name, value: field.value });
    }, [field.value])

    const handleSelect = (event: any) => {
        setSelected(event.value);
        helpers.setValue(event.value)
    }

    return (
        <div style={{ flex: 1 }}>
            <Field name={name} label={label} isRequired={required}>
                {(fieldProps) => <>
                    <AtlaskitAsyncSelect
                        cacheOptions
                        defaultOptions
                        value={selected}
                        defaultValue={selected}
                        loadOptions={fetch}
                        onChange={handleSelect}
                        isOptionSelected={(option) => option.value === value}
                        {...fieldProps} />
                    {meta.error && (
                        <ErrorMessage>
                            {meta.error}
                        </ErrorMessage>
                    )}
                </>}
            </Field>
        </div>
    );
}

export default AsyncSelect;