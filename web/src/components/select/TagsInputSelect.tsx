import { Field } from "@atlaskit/form";
import { FunctionComponent, useEffect, useState } from "react";
import { CreatableSelect as AtlaskitSelect } from '@atlaskit/select';
import { useField } from "formik";

export interface SelectOption {
    label?: string;
    value: any
}

export interface SelectProps {
    name: string;
    label: string;
    value?: { name: string }[]
    placeholder?: string;
}

interface SelectedEntity {
    label: string;
    value: { name: string }
}

const TagsInputSelec: FunctionComponent<SelectProps> = ({ name, value, label, placeholder }: SelectProps) => {

    const [field, meta, helpers] = useField(name);
    const [values, setValues] = useState<SelectedEntity[]>([]);

    useEffect(() => {
        const _values = (value || []).map(e => ({ label: e.name, value: e }));
        setValues(_values);
    }, [])

    const handleCreate = (value: string) => {

        const _values = [...values, { label: value, value: { name: value } }];
        setValues(_values);

        helpers.setValue(_values.map(e => e.value));
    }

    const handlechange = (_values: any, actionMeta: any) => {
        setValues((_values || []));
        helpers.setValue((_values || []).map((e: any) => e.value));
    }

    return (
        <Field name={name} label={label} >
            {(fieldProps) => <AtlaskitSelect
                cacheOptions
                defaultOptions
                onChange={handlechange}
                onCreateOption={handleCreate}
                loadOptions={fetch}
                noOptionsMessage={() => null}
                value={values}
                isMulti
                placeholder={placeholder}
                {...fieldProps} />}
        </Field>
    );
}

export default TagsInputSelec;