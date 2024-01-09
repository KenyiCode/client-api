const redis = require("redis")
const client = redis.createClient()

client.connect().catch(console.error)

const setJWT = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            client.set(key, value, (err, res) => {
                if (err) reject (err)
                resolve(res)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getJWT = (key) => {
    return new Promise((reject, resolve) => {
        try {
            client.get(key, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    setJWT,
    getJWT
}