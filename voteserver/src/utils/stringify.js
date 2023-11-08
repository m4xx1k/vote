const User = require('../mongo/user.model')
const Candidate = require('../mongo/candidate.model')
const Nomination = require('../mongo/nomination.model')
const Vote = require('../mongo/vote.model')
const {faker, fakerRU, fakerEN} = require('@faker-js/faker')
const db = require("../mongo/_connect");
const voteService = require('../services/vote.service')

const fakeIp = () => `${faker.number.int({min: 20, max: 255})}.${faker.number.int({
    min: 20,
    max: 255
})}.${faker.number.int({min: 20, max: 255})}.${faker.number.int({min: 20, max: 255})}`


const feed = async () => {
    const users = new Array(20).fill(null).map(_ => {
        return {

            tg_id: faker.number.int({min: 99999, max: 1000000}),
            ip: fakeIp(),
            username: faker.internet.userName(),
            phone: faker.phone.number()
        }
    })
    // for (const user of users) {
    //     await User.create(user)
    // }

    // const nominations = new Array(4).fill('').map(_ => {
    //     return {
    //         order: 0,
    //         ru: {
    //             name:fakerRU.company.name()
    //         },
    //         uz: {
    //
    //             name:fakerEN.company.name()
    //
    //         }
    //     }
    // })
    // const createdNominations = []
    // for (const nomination of nominations) {
    //     const res = await Nomination.create(nomination)
    //     createdNominations.push(res)
    // }
    const createdNominations = await Nomination.find({}, '_id')
    const candidates = new Array(40).fill(null).map(_ => {
        const {_id: nomination} = createdNominations[faker.number.int({min: 0, max: 3})]
        return {
            order: 0,
            photo: faker.image.avatar(),
            nomination,

            uz: {
                name: `${fakerEN.person.firstName()} ${fakerEN.person.lastName()}`,
                description: fakerEN.person.bio()
            },
            ru: {
                name: `${fakerRU.person.firstName()} ${fakerRU.person.lastName()}`,
                description: fakerRU.person.bio()
            }
        }
    })
    for (const candidate of candidates) {
        const res = await Candidate.create(candidate)
    }
    console.log('finish')
}
const feedVotes = async () => {
    const started = new Date().getTime()
    const nominations = await Nomination.find({}, '_id').lean()
    const nomination = nominations[0]._id
    const fakeUsers = new Array(2000).fill(null).map(_ => {
        return {

            tg_id: faker.number.int({min: 99999, max: 100000000}),
            ip: fakeIp(),
            username: faker.internet.userName(),
            phone: faker.phone.number()
        }
    })
    const candidates = await Candidate.find({nomination: nomination._id}, '_id')
    for (const user of fakeUsers) {
        const createdUser = await User.create(user)
        const randomCandidateIndex = faker.number.int({min: 0, max: candidates.length - 1})
        const candidate = candidates[randomCandidateIndex]
        const type = ['for','for', 'against'][faker.number.int({min: 0, max: 2})]
        const vote = await Vote.create({
            user: createdUser._id, candidate: candidate._id, nomination: nomination._id, type
        })
        console.log({vote})

    }


    const finishVotes = new Date().getTime()
    console.log('fake votes finished at ', (finishVotes - started) / 1000)
    // await voteService.calculateCandidateRatings(nomination)
    // const finishcalculating = new Date().getTime()
    //
    // console.log('finishcalculating of votes ', (finishcalculating - finishVotes) / 1000)

}
feedVotes()
