import {expect} from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Authorization tests', () => {
    describe('Authorization with valid data', () => {
        let response
        before(async () => {
            response= await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: process.env.EMAIL, password: process.env.PASSWORD})
        })

        it('Response status code is 200', async () => {
            expect(response.statusCode).to.eq(200)
        })

        it('Response body returns correct message', async () => {
            expect(response.body.message).to.eq('Auth success')
        })

        it('Response has a token', async () => {
            expect(response.body.payload.token).to.be.a('string')
        })

        it('Response body contains user ID', async() => {
            expect(response.body.payload.userId).to.be.a('string')
        })

        it('Response does not contain password', async () => {
            expect(response).to.not.have.property('password')
        })
    })

    describe('Authentication tests negative', () => {

        it('Login with invalid password', async () => {
            let response= await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: process.env.EMAIL, password: "Booboo1"})
            expect(response.statusCode).to.eq(400)
        })

        it('Login with invalid email', async () => {
            let response= await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: "akuna1@matata.com", password: process.env.PASSWORD})
            expect(response.statusCode).to.eq(400)
        })

        it('Response body returns error message', async () => {
            let response= await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: process.env.EMAIL, password: "Booboo1"})
            expect(response.body.message).to.eq('Auth failed')
        })


    })
})
