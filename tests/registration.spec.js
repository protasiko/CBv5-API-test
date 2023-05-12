import request from "supertest";
import { faker } from '@faker-js/faker';

describe('Registration positive',  () => {
    describe("Registration with valid credentials", () => {
        let res
        const companyName = faker.company.name()
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const email = Date.now() + 'gmail.com'
        const password = faker.internet.password()
        const ver = 'v5'


        before(async () => {
            res = await request(process.env.BASE_URL)
              .post('/v5/user')
              .send({companyName, firstName, lastName, email, password, ver})
        })
            it('check status code')
    })
})
