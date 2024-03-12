


export const getFormattedDate = (dateTimestamp: string) => {
    const date = new Date(dateTimestamp);

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);

    const formattedDate = `${day}.${month}.${date.getFullYear()}`;
    return formattedDate;
}