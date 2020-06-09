import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV;

const dbUrls = {
    development: process.env.DEVELOPMENT_DB,
    staging: process.env.STAGING_DB,
    localtest: process.env.LOCALTEST_DB,
    test: process.env.TEST_DB,
    production: process.env.PRODUCTION_DB
}

export const dbUrl = dbUrls[environment];

