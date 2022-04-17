const apiRoot: any = {
    local: process.env.RD_API_HOST,
    development: process.env.RD_DEV_API,
    staging: process.env.RD_STAGING_API,
    production: process.env.RD_PRODUCTION_API
}

export default {
    apiRoot
}