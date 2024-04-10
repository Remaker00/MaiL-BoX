import { useState, useEffect } from 'react';
import axios from 'axios';
import EmailView from './EmailView';
import DeleteIcon from '@mui/icons-material/Delete';

const Inbox = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/mail/get-mail', {
                headers: {
                    Authorization: token,
                },
            });
            setEmails(response.data.receivedEmails);
        } catch (error) {
            console.error('Failed to fetch email data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailClick = async (email) => {
        if (!email.read) {
            try {
                await axios.put(`http://localhost:4000/mail/mark-read/${email._id}`);
                const updatedEmail = { ...email, read: true };
                setSelectedEmail(updatedEmail);
            } catch (error) {
                console.error('Failed to mark as read:', error);
            }
        } else {
            setSelectedEmail(email);
        }
    };

    const handleDelete = async (e, email) => {
        e.stopPropagation();

        axios.delete(`http://localhost:4000/mail/deletemail/${email._id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert('Email deleted successfully');
                    const update = emails.filter((e) => e._id !== email._id);
                    setEmails(update);
                } else {
                    alert('Failed to delete email');
                }
            })
            .catch((error) => {
                alert('An error occurred while deleting the email:', error);
            });
    };

    useEffect(() => {
        fetchEmails();
    }, [selectedEmail]);

    const formatDateString = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString();
    };

    return (
        <div className="email-list1">
            {loading ? (
                <div className="loading-container">
                    <img src="/giphy.gif" alt="Loading..." />
                </div>
            ) : (
                <div className="email-list">
                    {emails.map((email, i) => (
                        <li key={i}
                            className={`email ${email.read ? 'read' : 'unread'}`}
                            onClick={() => handleEmailClick(email)}
                        >
                            {!email.read && <div className="blue-dot"></div>}
                            <div className="email-sender">{email.sender_mail}</div>
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

export default Inbox;
