import { ErrorMessage, Field } from "@atlaskit/form";
import { FunctionComponent, useEffect, useState } from "react";
import { AsyncSelect as AtlaskitAsyncSelect, OptionType, ValueType } from '@atlaskit/select'
import { useField } from "formik";

export interface SelectOption<T> {
    label?: string;
    value: T
}

export interface AsyncSelectProps {
    name: string;
    label: string;
    required?: boolean;
    value?: SelectOption<unknown> | SelectOption<unknown>[];
    isMulti?: boolean;
    fetch: (filter: string) => Promise<SelectOption<unknown>[]>
}

const AsyncSelect: FunctionComponent<AsyncSelectProps> = ({ name, value, label, required, isMulti, fetch }: AsyncSelectProps) => {

    const [field, meta, helpers] = useField(name);

    const handleSelect = (event: any | any[]) => {

        if (isMulti) {

            const ids = event?.map((e: any) => e.value?.id );

            const values = event?.filter((e: any, i: number) => ids.indexOf(e.value?.id) == i);
            
            helpers.setValue(values)
        }
        else {
            helpers.setValue(event)
        }
    }

    return (
        <div style={{ flex: 1 }}>
            <Field name={name} label={label} isRequired={required}>
                {(fieldProps) => <>
                    <AtlaskitAsyncSelect
                        cacheOptions
                        defaultOptions  
                        value={meta.value}
                        defaultValue={meta.value}
                        isMulti={isMulti}
                        loadOptions={fetch}
                        onChange={handleSelect}
                        placeholder="Selecionar..."
                        isOptionSelected={(option: any) => option.value === value}
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