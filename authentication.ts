const axios = require('axios');
require('dotenv').config();

export const LoginBasicPromise: any = (apiRoot: string) => {
    return new Promise(function(resolve, reject) {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        let data = {
            username: process.env.username,
            password: process.env.password
        };

        const param: URLSearchParams = new URLSearchParams();
        Object.keys(data).map((key, idx) => {
            param.append(key, data[key]);
        });

        resolve(
            axios({
                method: 'post',
                url: `${apiRoot}/api/v1/login/basic`, 
                headers: headers,
                data: param
            })
            .then((response: any) => `${response.data.token_type} ${response.data.access_token}`)
            .catch((error: any) => `Error in user login: ${error}`) 
        );
    });
};
