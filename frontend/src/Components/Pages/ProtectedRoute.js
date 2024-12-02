import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ errorPage, targetPage }) {
    const [page, setPage] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        console.log(token);

        if (!token) {
            setPage(errorPage);
            return;
        }

        try {
            const decodeToken = jwtDecode(token);
            const { exp } = decodeToken;
            if (exp * 1000 - Date.now() < 0) {
                setPage(errorPage);
                return;
            }
            setPage(targetPage);
        } catch (error) {
            setPage(errorPage); // Caso ocorra erro no decode do token, mostra a página de erro
        }
    }, [errorPage, targetPage]); // Atualiza quando 'errorPage' ou 'targetPage' mudarem

    return page;
}
