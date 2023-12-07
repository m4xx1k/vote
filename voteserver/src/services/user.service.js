const User = require('../mongo/user.model')

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
