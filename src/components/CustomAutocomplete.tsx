import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { Autocomplete, TextField } from "@mui/material";
import createDebounce from "../utils/createDebounce";


export type OptionType = {
    id: number | string;
    value: string;
}

interface TProps {
    id: string;
    label: string;
    // valueRef: MutableRefObject<OptionType | null>;
    value: OptionType | null;
    setValue: (newOption: OptionType | null) => void;
    fetchNewOptions: (param: string) => Promise<OptionType[] | []>;
}



const CustomAutocomplete: React.FC<TProps> = ({ id, label, value, setValue, fetchNewOptions }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<readonly OptionType[] | readonly []>([]);



    const handleFetchOptions = (param: string) => {
        fetchNewOptions(param)
            .then((newOptions) => {
                setOptions(newOptions);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const debouncedFetchOptions = createDebounce(handleFetchOptions, 350);
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
                // valueRef.current = newValue;
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

export default CustomAutocomplete;