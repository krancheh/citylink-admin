import { User, UserData } from "../types";
import { getFormattedDate } from "./getFormattedDate";





const getFormattedUser = (user: UserData) => {
    const formattedRegistrationDate = getFormattedDate(user.createdAt);
    const formattedBDay = user.birthDate ? getFormattedDate(user.birthDate.toString()) : undefined;

    const formattedUser: User = { ...user, createdAt: formattedRegistrationDate, birthdate: formattedBDay };
    return formattedUser;
}

export default getFormattedUser;