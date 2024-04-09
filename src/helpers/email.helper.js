const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lillian14@ethereal.email',
        pass: 'A7WXCh3sSv32t2Vhbm'
    }
});

const send = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await transporter.sendMail(info)
    
            console.log("Message sent: %s", result.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result))

            resolve(result)
        } catch (error) {
            console.log(error)
        }
    })
}

const emailProcessor = (email, pin) => {
    const info = {
        from: '"CRM Comp" <lillian14@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password Reset Pin", // Subject line
        text: "Here is your Pin: " + pin, // plain text body
        html: `
        Here is your Pin: 
        <b>${pin}</b>
        `, // html body
      }
    
    send(info)
}

module.exports = {
    emailProcessor
}