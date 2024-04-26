import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import createDebounce from "../../utils/createDebounce";


export type OptionType = {
    id: number | string;
    value: string;
}

interface IProps {
    id: string;
    label: string;
    value: OptionType | null;
    setValue: (newOption: OptionType | null) => void;
    fetchNewOptions: (param: string) => Promise<OptionType[] | []>;
}



const ServerSideAutocomplete = (props: IProps) => {
    const { id, label, value, setValue, fetchNewOptions } = props;
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<readonly OptionType[] | readonly []>([]);



    const handleFetchOptions = async (param: string) => {
        try {
            const newOptions = await fetchNewOptions(param);
            setOptions(newOptions);
        } catch (e) {
            console.log(e);
        }
    }

    const debouncedFetchOptions = createDebounce(handleFetchOptions, 350);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoDebouncedFetchOptions = useCallback(debouncedFetchOptions, []);


    useEffect(() => {
        if (inputValue) {
            memoDebouncedFetchOptions(inputValue);
        }
        else setOptions([]);
    }, [inputValue, memoDebouncedFetchOptions]);


    return (
        <Autocomplete
            id={id}
            filterOptions={(x) => x}
            onInputChange={(event, value) => {
                setInputValue(value);
            }}
            onChange={(event, newValue: OptionType | null) => {
                setValue(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size={"small"}
                    label={label}
                />
            )}
            options={options}
            getOptionLabel={(option) => option.value}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            autoComplete
            includeInputInList
            fullWidth
            value={value}
            openText="Раскрыть"
            closeText="Закрыть"
            noOptionsText="Ничего не найдено"
        />
    );
};

export default ServerSideAutocomplete;