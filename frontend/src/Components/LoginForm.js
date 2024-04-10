import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({email: 'demo@gmail.com', password: 'demo'});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            email: formData.email,
            password: formData.password,
        };

        axios.post('https://my-mail-six.vercel.app/user/checkUser',{dataToSend})
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                
                alert('Successfully Logged In: ');

                setFormData({
                    email: '',
                    password: '',
                });
                navigate('/mail-box');
            })
            .catch((error) => {
                alert(error.response.data);
            });
    }


    return (
        <div className='Container'>
            <div className='formContainer'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account?{' '}
                    <Link to="/" className='toggleLink'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};


export default LoginForm;
