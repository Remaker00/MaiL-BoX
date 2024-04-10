import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirm_password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            alert('Password and Confirm Password do not match');
        }
        else {
            const dataToSend = {
                email: formData.email,
                password: formData.password,
            };

            axios.post('http://localhost:4000/user/addUser', { dataToSend })
                .then(() => {
                    alert('Account Successfully Created: ');
                    setFormData({
                        email: '',
                        password: '',
                        confirm_password: '',
                    });
                    navigate('/login-form');
                })
                .catch((error) => {
                    alert(error.response.data);
                });
        }
    };

    return (
        <div className='Container'>
            <div className='formContainer'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name='confirm_password'
                        placeholder='Confirm Password'
                        required
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Already have an account?{' '}
                    <Link to="/login-form" className='toggleLink'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
