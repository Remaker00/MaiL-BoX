const Mail = require('../model/mail');
const User = require('../model/user');

exports.addmail = async (req, res) => {
    try {
        const sender_mail = req.user.email;
        const { email, subject, description } = req.body;
        const existingMail = await User.findOne({ email });

        if (!existingMail) {
            return res.status(404).json({ error: "Email doesn't exist" });
        }
        const newMail = new Mail({
            sender_mail,
            email,
            subject,
            description,
        });
        const savedMail = await newMail.save();
        return res.status(200).json({ message: 'Email sent successfully', email: savedMail });

    } catch (error) {
        return res.status(500).json({ error: 'Failed to send email' });
    }
};

exports.receivedmail = async (req, res) => {
    try {
        const email = req.user.email;
        const receivedEmails = await Mail.find({ email });

        return res.status(200).json({ receivedEmails });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve received emails' });
    }

}

exports.sentmail = async (req, res) => {
    try {
        const email = req.user.email;
        const sentEmails = await Mail.find({ sender_mail: email });

        return res.status(200).json({ sentEmails });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve received emails' });
    }

}

exports.markedmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        const email = await Mail.findById(emailId);

        if (!email) {
            return res.status(404).json({ error: 'Email not found' });
        }

        email.read = true;
        await email.save();

        return res.status(200).json({ message: 'Email marked as read' });
    } catch (error) {
        console.error('Failed to mark email as read:', error);
        return res.status(500).json({ error: 'Failed to mark email as read' });
    }
}

exports.deletemail = async (req, res) => {
    const emailId = req.params.id;

    try {
        const deletedEmail = await Mail.findByIdAndDelete(emailId);

        if (!deletedEmail) {
            return res.status(404).json({ message: 'Email not found' });
        }

        return res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}