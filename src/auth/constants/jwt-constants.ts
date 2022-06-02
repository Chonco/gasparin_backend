export const jwtConstants = {
    secret: process.env.JWT_SECRET
}

export interface JwtPayload {
    username: string,
    sub: number
}