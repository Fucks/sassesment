import { Field } from "@atlaskit/form";
import { FunctionComponent, useEffect, useState } from "react";
import { CreatableSelect as AtlaskitSelect, OptionType } from '@atlaskit/select';
import { useField } from "formik";

export interface SelectOption {
    label?: string;
    value: any
}

export interface SelectProps {
    name: string;
    label: string;
    value?: {name:string}[]
    // fetch: (filter: string) => Promise<SelectOption[]>
}

interface SelectedEntity {
    label: string;
    value: { name: string }
}

const Select: FunctionComponent<SelectProps> = ({ name, value, label }: SelectProps) => {

    const [field, meta, helpers] = useField(name);
    const [values, setValues] = useState<SelectedEntity[]>([]);

    useEffect(() => {
        const _values = (value || []).map(e => ({label: e.name, value: e}));
        setValues(_values);
    }, [])

    const handleCreate = (value: string) => {

        const _values = [...values, { label: value, value: { name: value } }];
        setValues(_values);

        helpers.setValue(_values.map(e => e.value));
    }

    return (
        <Field name={name} label={label} >
            {(fieldProps) => <AtlaskitSelect
                cacheOptions
                defaultOptions
                onCreateOption={handleCreate}
                loadOptions={fetch}
                value={values}
                isMulti
                {...fieldProps} />}
        </Field>
    );
}

export default Select;