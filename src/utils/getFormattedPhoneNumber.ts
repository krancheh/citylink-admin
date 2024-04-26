
export const formatPhoneNumber = (value: string) => {
    let inputValue = value.replace(/\D/g, '');

    if (inputValue.length > 0) {
        if (inputValue.length === 1 && inputValue !== "7") {
            inputValue = "7" + inputValue[0];
        }
        const formattedValue = (inputValue.length > 1 ? '+7 (' : "") + inputValue.slice(1, 4) + (inputValue.length > 4 ? ') ' : "") +
            inputValue.slice(4, 7) + (inputValue.length > 7 ? ' - ' : "") +
            inputValue.slice(7, 9) + (inputValue.length > 9 ? ' - ' : "") +
            inputValue.slice(9, 11);

        return formattedValue;
    }
}