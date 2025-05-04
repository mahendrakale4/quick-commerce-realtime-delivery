import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await api.post('/api/auth/logout');
                console.log(response.data);

                if (response.status === 200) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}
