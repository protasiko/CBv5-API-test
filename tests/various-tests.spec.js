import {register} from "../helpers/general-helper";
import request from "supertest";
const chance = require('chance').Chance()
import {login} from "../helpers/general-helper";
import {expect} from "chai";

describe.only('Email verification', () => {
    let user, str, endPoint, res, check
    const newEmail = 'user_' + Date.now() + '@pirate.com'
    before(async() => {
       user = await register(chance.first(), chance.last(), newEmail, process.env.PASSWORD)           // new user registration API call
        // console.log(user.body)

        str = await request(process.env.BASE_URL)                                               // get email API call
            .post('/email/search')
            .send({ email: newEmail })

        // console.log(str.body)

        endPoint = str.body.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1]

        res = await request(process.env.BASE_URL).get(endPoint).send()                          // get to link API call

        check = await login(newEmail, process.env.PASSWORD)                                     // login API call

    })
    it('check the response status', () => {
        expect(res.statusCode).to.eq(200)
    })

    it('check response message', () => {
        expect(res.body.message).to.include('confirmed')
    })

    it('check the role', () => {
        expect(check.body.payload.user.roles).to.include('verified')
    })
})
