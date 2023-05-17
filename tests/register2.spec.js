import { expect } from 'chai'
import { reg } from '../helpers/general-helper'

describe('Registration2', () => {
    describe('User registration positive2', () => {
        const newEmail = 'user_' + Date.now() + '@pirate.com'
        let res
        before(async () => {
            res = await reg(newEmail)
        })
        it('check response status code', () => {
            expect(res.statusCode).to.eq(201)
        })
        it('check response message', () => {
            expect(res.body.message).to.eq(
                'User created successfully. Please check your email and verify it'
            )
        })
    })
    describe('User registration negative2', () => {
        describe('create a user without email', () => {
            let res
            before(async () => {
                res = await reg()
            })
            it('check response status code', () => {
                expect(res.statusCode).to.eq(404)
            })
            it('check response message', () => {
                expect(res.body.message).to.eq('User was not created')
            })
        })
        // describe('create a user without password', () => {           // not applicable due to incorrect helper
        //   let res
        //   const newEmail = 'user_' + Date.now() + '@pirate.com'
        //   before(async () => {
        //     res = await reg(newEmail)
        //   })
        //   it('check response status code', () => {
        //     expect(res.statusCode).to.eq(400)
        //   })
        //   it('check response message', () => {
        //     expect(res.body.message).to.eq('Wrong password format')
        //   })
        // })
        //
        // describe('create a user without first name', () => {        // not applicable due to incorrect helper
        //   let res
        //   const newEmail = 'user_' + Date.now() + '@pirate.com'
        //   before(async () => {
        //     res = await reg(newEmail)
        //   })
        //   it('check response status code', () => {
        //     expect(res.statusCode).to.eq(404)
        //   })
        //   it('check response message', () => {
        //     expect(res.body.message).to.eq('User was not created')
        //   })
        // })
        //
        // describe('create a user without last name', () => {         // not applicable due to incorrect helper
        //   let res
        //   const newEmail = 'user_' + Date.now() + '@pirate.com'
        //   before(async () => {
        //     res = await reg(newEmail)
        //   })
        //   it('check response status code', () => {
        //     expect(res.statusCode).to.eq(404)
        //   })
        //   it('check response message', () => {
        //     expect(res.body.message).to.eq('User was not created')
        //   })
        // })
        describe('create a user with existing email2', () => {
            let res
            before(async () => {
                res = await reg(process.env.EMAIL)
            })
            it('check response status code', () => {
                expect(res.statusCode).to.eq(409)
            })
            it('check response message', () => {
                expect(res.body.message).to.eq('User with this e-mail exists')
            })
        })
    })
})
