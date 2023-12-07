const axios = require('axios');
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDM5NjAwNDEsImlhdCI6MTcwMTM2ODA0MSwicm9sZSI6InRlc3QiLCJzdWIiOiI1ODE4In0.FBo4JLki553yWWxgMRh8oMfDEaCrA8mbVTX2D8hDq0o`
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
const main = async () => {
    try {
        // const tokenResponse = await getToken()
        // console.log(tokenResponse)
        const templateData = await getTemplates()
        console.log(templateData)
    } catch (e) {
        console.log('erorr', e)
    }
}
main()
