const axios = require('axios');
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ1NDc4NjcsImlhdCI6MTcwMTk1NTg2Nywicm9sZSI6InVzZXIiLCJzdWIiOiI1ODE4In0.aKVEVqgGqvjaHDPNZWpKeRJ_q6F3wO3yTqWuMa8jcC8`
// const config = {
//
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://notify.eskiz.uz/api/auth/login',
//     headers: {
//         ...data.getHeaders()
//     },
//     data: data
// };
//
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
const getToken = async () => {
    const data = {
        email: "indexpr.agency@gmail.com",
        password: "wablie1gKYJwEczR8YdeRgRcHVXhnECj2KS1vIOP"
    }
    const config = {

        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify.eskiz.uz/api/auth/login',
        data
    };
    return await axios(config)
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
            mobile_phone: '998917812324',
            message: 'Ваш код верификации RepostUZ - 123456',
            from: '4546'
        }
    }
    return await axios(config)
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
const main = async () => {
    try {
        // const tokenResponse = await getToken()
        // console.log(tokenResponse)
        const data = await getTotals()
        console.log(data)
    } catch (e) {
        console.log('erorr', e)
    }
}
main()
