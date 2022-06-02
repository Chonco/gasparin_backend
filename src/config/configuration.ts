export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expireTime: process.env.JWT_EXPIRE_TIME_SEC,
    }
})