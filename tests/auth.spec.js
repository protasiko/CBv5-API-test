import { expect } from 'chai'
import 'dotenv/config'
import {login} from "../helpers/general-helper";

describe('Authorization positive', () => {
    let res
    before(async () => {
        res = await login(process.env.EMAIL, process.env.PASSWORD)
    })
    describe('login with valid credentials', () => {
        it('check the status code', async () => {
            expect(res.statusCode).to.eq(200)
        })
        it('check the body message is correct', async () => {
            expect(res.body.message).to.eq('Auth success')
        })
        it('check the response has token', async () => {
            expect(res.body.payload.token).not.to.be.undefined
        })
        it('check the response does not contain password', async () => {
            expect(res.body.payload.user).to.have.property('password', null)
        })
    })
})

describe('Authorization negative', () => {
    describe('login with empty fields', () => {
        let res
        before(async () => {
            res = await login()
        })
        it('check response status code', () => {
            expect(res.statusCode).to.eq(400)
        });
        it('check the response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })
    describe('login with invalid email', () => {
        let res
        before(async () => {
            res = await login('invalid@pirate.com', process.env.PASSWORD)
        })
        it('check response status code', () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check response message', () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })
})
