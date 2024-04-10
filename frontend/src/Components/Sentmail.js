import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmailView from './EmailView';
import DeleteIcon from '@mui/icons-material/Delete';

const SentMail = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [sentEmails, setSentEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSentEmails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/mail/get-sent-mail', {
                headers: {
                    Authorization: token,
                },
            });
            setSentEmails(response.data.sentEmails);
        } catch (error) {
            console.error('Failed to fetch sent email data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
    };

    const handleDelete = async (e, email) => {
        e.stopPropagation();

        axios.delete(`http://localhost:4000/mail/deletemail/${email._id}`)
            .then((response) => {
                if (response.status === 200) {
                    const update = sentEmails.filter((e) => e._id !== email._id);
                    setSentEmails(update);
                } else {
                    alert('Failed to delete email');
                }
            })
            .catch((error) => {
                alert('An error occurred while deleting the email:', error);
            });
    };

    useEffect(() => {
        fetchSentEmails();
    }, []);

    const formatDateString = (date) => {
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate;
    };

    return (
        <div className="email-list1">
            {loading ? (
                <div className="loading-container">
                    <img src="/giphy.gif" alt="Loading..." />
                </div>
            ) : (
                <div className="email-list">
                    {sentEmails.map((email, i) => (
                        <li
                            key={i}
                            className="email"
                            onClick={() => handleEmailClick(email)}
                        >
                            <div className="email-sender">{email.email}</div>
                            <div className="email-subject">{email.subject}</div>
                            <div className="email-message">{email.description}</div>
                            <div className="email-date">{formatDateString(email.sentDate)}</div>
                            <button onClick={(e) => handleDelete(e, email)}><DeleteIcon /></button>
                        </li>
                    ))}
                </div>
            )}
            {selectedEmail && (
                <div className="backdrop">
                    <EmailView
                        selectedEmail={selectedEmail}
                        onClose={() => setSelectedEmail(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default SentMail;
