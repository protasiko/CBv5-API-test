import request from "supertest";
import { faker } from '@faker-js/faker';
import {expect} from "chai";

describe('Registration positive',  () => {
    describe("Registration with valid credentials", () => {
        let response
        const companyName = faker.company.name()
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            response = await request(process.env.BASE_URL)
              .post('/v5/user')
              .send({companyName, firstName, lastName, email, password})
        })
        // console.log(companyName, firstName, lastName, email, password)
            it('check status code', () => {
                expect(response.statusCode).to.eq(201)
            })

        it('Response status message is correct', () => {
            expect(response.body.message).to.eq(
                'User created successfully. Please check your email and verify it')
        })

    })
})
