import { User, UserData } from "../types";





const getFormattedUser = (user: UserData) => {
    let registrationDate;

    if (user.createdAt) {
        const date = new Date(user.createdAt);
        const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        const month = date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString();
        registrationDate = `${day}.${month}.${date.getFullYear()}`;
    }

    const formattedUser: User = Object.assign(user, { createdAt: registrationDate })
    return formattedUser;
}

export default getFormattedUser;