import dayjs from "dayjs";
import { User, UserData } from "../types";





const getFormattedUser = (user: UserData) => {
    const formattedRegistrationDate = dayjs(user.createdAt).format("DD.MM.YYYY");
    const formattedBDay = user.birthDate ? dayjs(user.birthDate).format("DD.MM.YYYY") : undefined;

    const formattedUser: User = { ...user, createdAt: formattedRegistrationDate, birthdate: formattedBDay };
    return formattedUser;
}

export default getFormattedUser;