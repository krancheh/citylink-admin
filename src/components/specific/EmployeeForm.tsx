import { Alert, Button, Collapse, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { string, date } from 'yup';
import * as yup from "yup";
import { Employee } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
import StaffService from "../../api/services/StaffService";
import { Position } from "../../utils/constants";
import { formatPhoneNumber } from "../../utils/getFormattedPhoneNumber";


interface IProps {
    handleCloseModal: () => void;
    setStaff: Dispatch<SetStateAction<Employee[]>>;
}


const validationSchema = yup.object({
    firstName: string()
        .required("Введите имя")
        .matches(/^[a-zA-Zа-яА-Я]*$/, "Введите корректное имя"),

    lastName: string()
        .required("Введите фамилию")
        .matches(/^[a-zA-Zа-яА-Я]*$/, "Введите корректную фамилию"),

    middleName: string()
        .matches(/^[a-zA-Zа-яА-Я]*$/, "Введите корректное отчество"),

    phoneNumber: string()
        .required("Введите номер телефона")
        .length(11, "Введите корректный номер телефона"),

    birthDate: date()
        .nullable(),

    email: string()
        .email("Введен некорректный email"),

    docNumber: string()
        .length(10),

    gender: string(),

    position: string<`${Position}`>()
        .required("Введите должность")
        .matches(/^[a-zA-Zа-яА-Я]*$/, "Введите корректную должность"),
})

const initialValues = {
    lastName: '',
    firstName: '',
    middleName: '',
    phoneNumber: '',
    email: '',
    birthDate: null,
    docNumber: '',
    gender: "не указ",
    position: '',
}

const EmployeeForm = (props: IProps) => {
    const { handleCloseModal, setStaff } = props;

    const [fetchError, setFetchError] = useState("");

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                setFetchError("");
                const newEmployee: Employee = {
                    ...values,
                    documentNumber: values.docNumber,
                    position: values.position as `${Position}` | undefined,
                    gender: values.gender === "м" ? true : values.gender === "ж" ? false : undefined,
                    birthDate: values.birthDate || undefined,
                }
                const response = await StaffService.addStaff(newEmployee);
                setStaff(prev => [...prev, response.data]);
                handleCloseModal();
            } catch (e: any) {
                // console.log(e); // dev-log
                setFetchError(e.message || "Неизвестная ошибка");
            }
        },
    });


    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateAreas: `
                        "alert alert"
                        "lname fname"
                        "mname mname"
                        "phnum phnum"
                        "email email"
                        "bdate bdate"
                        "docnum gender"
                        "pos pos"
                        "error error"
                        "cancel submit"
                        `
            }}
        >
            <Collapse in sx={{ gridArea: "alert" }}>
                <Alert severity="warning">Поля, отмеченные * являются обязательными</Alert>
            </Collapse>
            <TextField
                id="lastName"
                name="lastName"
                label="Фамилия"
                placeholder="Иванов"
                size='small'
                fullWidth sx={{ gridArea: "lname" }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
                required
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
                id="firstName"
                name="firstName"
                label="Имя"
                placeholder="Вася"
                size='small'
                fullWidth sx={{ gridArea: "fname" }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
                id="middleName"
                name="middleName"
                label="Отчество"
                placeholder="Иванович"
                size='small'
                fullWidth sx={{ gridArea: "mname" }}
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.middleName && !!formik.errors.middleName}
                helperText={formik.touched.middleName && formik.errors.middleName}
            />
            <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Номер телефона"
                placeholder="+7 (945) 983 - 23 - 57"
                inputProps={{
                    maxLength: 22
                }}
                size='small'
                type="tel"
                required
                fullWidth sx={{ gridArea: "phnum" }}
                value={formatPhoneNumber(formik.values.phoneNumber) || ""}
                onChange={(e) => {
                    formik.setFieldValue("phoneNumber", e.target.value.replace(/\D/g, ''), true);
                }}
                onBlur={formik.handleBlur}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            />
            <TextField
                id="email"
                name="email"
                label="Email"
                size='small'
                type="email"
                fullWidth sx={{ gridArea: "email" }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
            />
            <DatePicker
                label="Дата рождения"
                name="birthDate"
                slotProps={{
                    textField: {
                        id: "birthDate",
                        size: 'small',
                        error: formik.touched.birthDate && !!formik.errors.birthDate,
                        helperText: formik.touched.birthDate && formik.errors.birthDate,
                    },
                    field: {
                        clearable: true,
                        onClear: () => formik.setFieldValue("birthDate", null, true)
                    }
                }}
                value={formik.values.birthDate ? dayjs(formik.values.birthDate) : null}
                onChange={(value) => {
                    formik.setFieldValue("birthDate", value?.toJSON(), true)
                }}
                maxDate={dayjs()}
            />
            <TextField
                id="docNumber"
                name="docNumber"
                label="Паспортные данные"
                size='small'
                fullWidth sx={{ gridArea: "docnum" }}
                value={formik.values.docNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.docNumber && !!formik.errors.docNumber}
                helperText={formik.touched.docNumber && formik.errors.docNumber}
            />
            <FormControl sx={{ gridArea: "gender" }} size="small">
                <InputLabel id="gender-label">Пол:</InputLabel>
                <Select
                    id="gender"
                    name="gender"
                    labelId="gender-label"
                    size="small"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gender && !!formik.errors.gender}
                    label="Пол:"
                >
                    <MenuItem value={"м"}>Мужской</MenuItem>
                    <MenuItem value={"ж"}>Женский</MenuItem>
                    <MenuItem value={"не указ"}>Не указывать</MenuItem>
                </Select>
                <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
            </FormControl>
            <TextField
                id="position"
                name="position"
                label="Должность"
                size='small'
                required
                fullWidth sx={{ gridArea: "pos" }}
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.position && !!formik.errors.position}
                helperText={formik.touched.position && formik.errors.position}
            />
            <Collapse in={!!fetchError} sx={{ gridArea: "error" }}>
                <Alert severity="error">{fetchError}</Alert>
            </Collapse>
            <Button sx={{ mt: 2, gridArea: "cancel" }} variant="outlined" color='error' onClick={handleCloseModal}>Отмена</Button>
            <Button sx={{ mt: 2, gridArea: "submit" }} variant='contained' disabled={false} type='submit'>Добавить</Button>
        </form>
    )
}
export default EmployeeForm;