import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log(formData);

        try {

            const response = await api.post('/api/auth/partnerlogin', {
                email: formData.email,
                password: formData.password
            });

            if (response.data) {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.token);
                navigate('/'); // Redirect to home page after successful login
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during login');
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    )
}
export default Login;