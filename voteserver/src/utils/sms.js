require('dotenv').config()
const axios = require('axios');
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ1NDc4NjcsImlhdCI6MTcwMTk1NTg2Nywicm9sZSI6InVzZXIiLCJzdWIiOiI1ODE4In0.aKVEVqgGqvjaHDPNZWpKeRJ_q6F3wO3yTqWuMa8jcC8`

async function getAndSaveSmsToken() {
    const email = process.env.ESKIZ_SMS_EMAIL
    const password = process.env.ESKIZ_SMS_PASSWORD

    const config = {

        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify.eskiz.uz/api/auth/login',
        data: {
            email, password
        }
    };
    const token = await axios(config)
    console.log(token)
}
const getTemplates = async () => {
    const config = {

        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://notify.eskiz.uz/api/template/',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios(config)
}
const sendSms = async () => {
    const config = {

        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify.eskiz.uz/api/message/sms/send',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            mobile_phone: '998977380828',
            message: 'Ваш код верификации RepostUZ - 123456',
            from: '4546',
            callback_url: 'https://api.repostuz.pp.ua/vote/status'
        }
    }
    return await axios(config)
}
const sendSmsGlobal = async () => {
    try{
        const config = {

            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://notify.eskiz.uz/api/message/sms/send-global',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                mobile_phone: '380678656299',
                message: 'Sizning RepostUZ tasdiqlash kodingiz - 123456',
                // from: '4546',
                country_code: 'UA',
                callback_url: 'https://api.repostuz.pp.ua/vote/status',
                unicode:'0'
            }
        }
        return await axios(config)
    }catch (e) {
        console.log(JSON.stringify(e, null, 4))
    }

}
const getTotals = async () => {
    const config = {

        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify.eskiz.uz/api/user/totals',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            year: 2023,
            month: 12,
            is_global: 0
        }
    }
    return await axios(config)
}
const getTotals2 = async () => {
    const config = {

        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify.eskiz.uz/api/message/sms/get-user-messages',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            start_date: '2023-11-01 00:00',
            end_date: '2023-12-12 00:00',
            page_size: '20',
            count:'0'
        }
    }
    return await axios(config)
}
const main = async () => {
    try {
        // const tokenResponse = await getToken()
        // console.log(tokenResponse)
        const data = await getAndSaveSmsToken()
        // console.log(JSON.stringify({...data.data}, null, 4))
        // console.log(data)
    } catch (e) {
        console.log('erorr', e)
    }
}
main()
