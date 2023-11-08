
const accountSid = 'AC2ec2e75623ff1e36145e9cb59237129f';
const authToken = '85b45e591ab8c3e3f85186a6d061f13e';
const generateVerificationCode = () => Math.floor(Math.random() * (99_999 - 10_000 + 1)) + 10_000
const sendVerificationCode = async (phone, number) => {
    try {
        const body = `Код верифікації ${number}`
        const client = require('twilio')(accountSid, authToken);

        const message = await client.messages
            .create({
                body,
                from: '12522812885',
                to: phone.startsWith('+') ? phone : `+${phone}`
            })
        return !!message
    } catch (e) {
        console.log(e)
        return false
    }


}
module.exports = {generateVerificationCode, sendVerificationCode}
