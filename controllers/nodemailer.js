const nodemailer = require("nodemailer")

const mailReg = async(req,res) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'haylee.carter90@ethereal.email',
                pass: 'A4HbmB4NmEGGZnZbzm'
            }
        });

        let mailR = await transporter.sendMail({
            from: 'QUORA <haylee.carter90@ethereal.email>',
            to: "vish.jarsaniya@gmail.com",
            subject: "Registration successful",
            text: "Glad to have you on board!"
        });
        
        console.log("Check ethereal inbox");

    }
    catch(error){
        return res.json({error:"Error occured"});
    }
};

const mailLog = async(req,res) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'haylee.carter90@ethereal.email',
                pass: 'A4HbmB4NmEGGZnZbzm'
            }
        });

        let mailL = await transporter.sendMail({
            from: 'QUORA <haylee.carter90@ethereal.email>',
            to: "vish.jarsaniya@gmail.com",
            subject: "Login successful",
            text: "Welcome back!"
        });
        
        console.log("Check ethereal inbox");

    }
    catch(error){
        return res.json({error:"Error occured"});
    }
};


module.exports = {mailLog, mailReg}