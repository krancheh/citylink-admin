import { Button, TextField } from "@mui/material";
import CustomModal from "../common/CustomModal";
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useRef, useState } from "react";
import CitiesService from "../../api/services/CitiesService";
import { City } from "../../types";
import { cityNameValidation } from "../../utils/constants";


interface IProps {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    handleAddCity: (city: City) => void;
}


const CityForm = (props: IProps) => {
    const { isModalOpen, setIsModalOpen, handleAddCity } = props;

    const newCityInputRef = useRef<HTMLInputElement | null>(null);
    const [newCityInputError, setNewCityInputError] = useState("");

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleNewCityInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewCityInputError("");

        if (e.target.value && !cityNameValidation.test(e.target.value)) {
            setNewCityInputError("Некорректное название города");
        }
    }

    const handleCreateCity: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const cityName = newCityInputRef.current?.value;
        if (!cityName) {
            return setNewCityInputError("Введите название города");
        }

        try {
            const response = await CitiesService.addCity(cityName);
            console.log(response);
            const newCity = response.data.city;

            handleAddCity(newCity);
            handleCloseModal();
        } catch (e: any) {
            setNewCityInputError(e.message);
        }
    }

    return (
        <CustomModal
            id="cities-modal"
            title='Добавить город'
            description='Введите название города'
            open={isModalOpen}
            closeHandler={handleCloseModal}
        >
            <form onSubmit={handleCreateCity}>
                <TextField
                    label="Город"
                    size='small'
                    fullWidth sx={{ mb: "15px" }}
                    inputRef={newCityInputRef}
                    autoFocus
                    required
                    onChange={handleNewCityInputChange}
                    helperText={newCityInputError}
                    error={!!newCityInputError}
                />
                <Button sx={{ float: "right", ml: "20px" }} variant='contained' disabled={!!newCityInputError} type='submit'>Добавить</Button>
                <Button sx={{ float: "right" }} color='error' onClick={handleCloseModal}>Отмена</Button>
            </form>
        </CustomModal>
    )
}
export default CityForm