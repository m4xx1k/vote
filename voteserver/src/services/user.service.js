const User = require('../mongo/user.model')
const axios = require("axios");
const cache = require('../cache')

class userService {
    async create({ip, tg_id, username, phone}) {
        try {
            return await User.create({ip, tg_id, username, phone})

        } catch (e) {
            console.log('err on user create', e)
            return null
        }
    }

    async isNewUser({tg_id}) {
        const isUserInDatabase = await User.findOne({tg_id})
        return !isUserInDatabase
    }

    async findUsersInRange({startDate, endDate}) {
        const req = {}
        if (startDate) {
            req.createdAt = {}
            req.createdAt.$gte = new Date(startDate).setHours(0, 0, 0, 0)
        }
        if (endDate) {
            if (!req.createdAt) req.createdAt = {}
            req.createdAt.$lte = new Date(endDate).setHours(23, 59, 59, 999)
        }
        console.log({req})
        const users = await User.find(req);
        return users;
    }

    async getAndSaveSmsToken() {
        try {
            const email = process.env.ESKIZ_SMS_EMAIL
            const password = process.env.ESKIZ_SMS_PASSWORD
            const config = {

                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://notify.eskiz.uz/api/auth/login',
                data: {email, password}
            };
            const response = await axios(config)
            const token = response.data?.data?.token
            if (token) {
                cache.del('token')
                cache.set('token', token, 24 * 60 * 60)
                return token
            }
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async sendUzbekSms({token, mobile_phone, code}) {
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

    async sendSmsGlobal({token, code, mobile_phone}) {
        try {
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
                    unicode: '0'
                }
            }
            return await axios(config)
        } catch (e) {
            console.log(JSON.stringify(e, null, 4))
        }

    }

    async sendSms({mobile_phone, code}) {
        let token = cache.get('token')
        if (!token) {
            token = await this.getAndSaveSmsToken()
        }


    }

    async sendMessage({text, recipient}) {
        console.log({text, recipient})
        const url = 'https://msg.messaggio.com/api/v1/send'; // Замініть це на реальний URL вашого API

        const headers = {
            'Content-Type': 'application/json',
            'Messaggio-Login': 'GNqoxMIczG' // Додайте ваш ключ API в заголовок запиту
        };

        const requestBody = {
            recipients: [{phone: `${recipient}`}],
            channels: ['sms'],
            options: {
                tll: 60
            },
            sms: {
                from: 'Repost UZ',
                content: [{
                    type: 'text',
                    text
                }]
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (response.ok) {
            // Обробка успішної відповіді
            console.log('Повідомлення було успішно надіслано:', data);
            return data;
        } else {
            // Обробка помилки
            console.error('Помилка:', {status: response.status, data});
            throw new Error(data || 'Сталася помилка');
        }
    }
}


module.exports = new userService();
