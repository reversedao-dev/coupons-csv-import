const csvtojson = require('csvtojson');
const fs = require('fs');

export interface CouponRedemptionItems {
    coupon_code: string;
    coupon_title: string;
    coupon_icon: string;
    description: string;
    country: string[];
    expiration_date: string;
    issue_at: string;
    issue_by: string;
    is_active: boolean;
    price: string;
    coupon_redeem_code: string[];
}

const env: string = process.env.NODE_ENV || 'production'
console.log(`running on ${env} environment`);
const intputPath: string = `./src/${env}/data.csv`;
const outputPath: string = `./src/${env}/output.json`;
console.log(`reading csv file from ${intputPath}`);

csvtojson().fromFile(intputPath).then((json: CouponRedemptionItems[]) => {
    let output: any = {};
    let cCode: string = ''; // coupon_code
    let rCode: string[] = []; // redeem_code
    
    console.log(`${json.length} coupon is scanned`);

    [ ...json ].forEach((i: any) => {

        let couponCode: string = i.coupon_code;
        if (couponCode === cCode) {
            rCode = [ ...rCode, i.coupon_redeem_code ];
        } else {
            rCode = [ i.coupon_redeem_code ];
            cCode = couponCode;
        }

        output[i.coupon_code] = { ...i, country: [ i.country ] };
        output[i.coupon_code].coupon_redeem_code = rCode;
    });

    fs.writeFile(outputPath, JSON.stringify(output), 'utf-8', (err: any) => {
        if (err) console.log('Error in generating csv', err);
    });

    console.log(`Outputing json at ${outputPath}`)
});
