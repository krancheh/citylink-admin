import { User, UserData } from "../types";





const getFormattedUser = (user: UserData) => {
    let registrationDate;
    const date = new Date(user.createdAt);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    registrationDate = `${day}.${month}.${date.getFullYear()}`;

    const formattedUser: User = { ...user, createdAt: registrationDate };
    return formattedUser;
}

export default getFormattedUser;