import { useNavigate } from "react-router-dom"

export const useNotFoundPage = () => {
    const navigate = useNavigate();
    return () => {navigate("/not-found")}
}