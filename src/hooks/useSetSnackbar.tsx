import { useAppDispatch } from "../store";
import { SnackbarType, setSnackbar } from "../store/notificationsSlice";

const useSetSnackbar = () => {
    const dispatch = useAppDispatch();

    return (snackbar: SnackbarType) => {
        dispatch(setSnackbar(snackbar))
    }
}
export default useSetSnackbar