import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const EmailEditor = () => {
    const [formData, setFormData] = useState({ email: '', subject: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlemailsent = async () => {
        const token = localStorage.getItem("token");
        const dataToSend = {
            email: formData.email,
            subject: formData.subject,
            description: formData.description,
        };

        try {
            const response = await axios.post('http://localhost:4000/mail/sent-mail', dataToSend, {
                headers: {
                    Authorization: token,
                },
            });

            if (response.status === 200) {
                alert(response.data.message);
                setFormData({
                    email: '',
                    subject: '',
                    description: '',
                });
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

    return (
        <div className="email-editor1">
            <div className="email-editor">
                <label>To:</label>
                <div className="mailbox">
                    <PersonIcon className="mailogo" />
                    <input
                        type="email"
                        name='email'
                        placeholder='Enter mail id...'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <hr />
                <div>
                    <label>Subject:
                        <input
                            type="text"
                            name='subject'
                            placeholder='Subject...'
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <hr />
                <div>
                    <label>Message:
                        <textarea
                            name='description'
                            placeholder='Type here...'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <hr />
                <button onClick={handlemailsent}>Send Email</button>
            </div>
        </div>
    );
};

export default EmailEditor;
