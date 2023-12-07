const PhoneNumber = require('libphonenumber-js');
const axios = require("axios");
const cache = require('../cache')

function formatPhone(phoneNumberString) {
    let mobile_phone = phoneNumberString
    const symbolsToDelete = ['+', '-', ' ', '(', ')']
    for (const symbol of symbolsToDelete) {
        mobile_phone = mobile_phone.replaceAll(symbol, '')
    }
    return {
        uz: mobile_phone.startsWith('998'),
        mobile_phone
    }


}

class userService {

    async getAndSaveSmsToken() {
        try {
            const email = process.env.ESKIZ_SMS_EMAIL
            const password = process.env.ESKIZ_SMS_PASSWORD
            console.log({email, password})
            const config = {

                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://notify.eskiz.uz/api/auth/login',
                data: {email, password}
            };
            const response = await axios(config)
            console.log('token data',JSON.stringify(response.data, null, 4))
            const token = response.data?.data?.token
            if (token) {
                cache.del('token')
                cache.set('token', token, 24 * 60 * 60)
                return token
            }
        } catch (e) {
            console.log('getAndSaveSmsToken')
            return null
        }
    }

    async sendUzbekSms({mobile_phone, code}) {
        let token = cache.get('token')
        if (!token) {
            token = await this.getAndSaveSmsToken()
        }
        console.log(token)
        const config = {

            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://notify.eskiz.uz/api/message/sms/send',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                mobile_phone,
                message: `Sizning RepostUZ tasdiqlash kodingiz - ${code}`,
                from: '4546',
                callback_url: 'https://api.repostuz.pp.ua/vote/status'
            }
        }
        return await axios(config)
    }

    async sendSmsGlobal({code, mobile_phone}) {
        try {
            let token = cache.get('token')
            if (!token) {
                token = await this.getAndSaveSmsToken()
            }
            const config = {

                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://notify.eskiz.uz/api/message/sms/send-global',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    mobile_phone,
                    message: `Ваш код верификации RepostUZ - ${code}`,
                    // from: '4546',
                    country_code: 'UA',
                    callback_url: 'https://api.repostuz.pp.ua/vote/status',
                    unicode: '1'
                }
            }
            return await axios(config)
        } catch (e) {
            console.log(JSON.stringify(e, null, 4))
        }

    }

    async sendSms({phone, code}) {
        let result

        const {uz,mobile_phone} = formatPhone(phone)
        if (uz) {
            result = await this.sendUzbekSms({mobile_phone, code})
            console.log({uz, result: result.data})
        } else {
            result = await this.sendSmsGlobal({mobile_phone, code})
            console.log({uz, result: result.data})
        }
        return {uz,mobile_phone}
    }

}


module.exports = new userService();
