import request from 'supertest'
const chance = require('chance').Chance()

function login(email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({email, password })
}

function register(firstName, lastName, email, password) {
    return request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
}

function reg(email){
    return request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
            firstName: chance.first(),
            lastName: chance.last(),
            email,
            password: process.env.PASSWORD,
        })
}

export { login, register, reg }
