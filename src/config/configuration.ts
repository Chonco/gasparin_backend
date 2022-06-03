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
        expireTimeSecret: process.env.JWT_SECRET_EXPIRE_TIME_SEC,
        expireTimePublic: process.env.JWT_PUBLIC_EXPIRE_TIME_SEC,
    },
    encrypt: {
        roundsToHash: process.env.ROUNDS_TO_HASH
    }
})