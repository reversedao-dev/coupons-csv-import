// import JsonData from './output.json';
const axios = require('axios');
import { CouponRedemptionItems } from './script';
import { LoginBasicPromise } from './authentication';
import constants from './constants';
import { LogResponse } from "./log";

const env: string = process.env.NODE_ENV || 'development'
const filePathRoot: string = `../src/${process.env.NODE_ENV == 'staging' ? 'staging' : 'production'}`;
console.log(`executing coupon import`);
console.log(`running on ${env}`)
console.log(`reading output file from ${filePathRoot}`)

const apiRoot: string = constants.apiRoot[env];
console.log(`pointing to server api: ${apiRoot}`)
const JsonData = require(`${filePathRoot}/output.json`);

export const importDataPromise: any = (authHeader: string) => {
    const headers = {
        Authorization: `${authHeader}`
    };

    return new Promise<any>((resolve, reject) => {
        resolve(
            Object.keys(JsonData).forEach(function(key, idx) {
                let data: CouponRedemptionItems = JsonData[key];
                console.log('posting coupon code', key);
                axios({
                    method: 'post',
                    url: `${apiRoot}/api/v1/coupon-asset/admin/import`,
                    headers: headers,
                    data: data
                })
                .then((response: any) => LogResponse(response.data, filePathRoot))
                .catch((error: any) => {
                    console.log(`error in importing coupon: ${data.coupon_code} [${error}]`)
                })
            })
        );
    });
};

new Promise((resolve, reject) => {
    resolve(new LoginBasicPromise(apiRoot,)
        .then((authHeader: string) => new importDataPromise(authHeader))
        .error((err: any) => err));
})
