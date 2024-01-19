const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)

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

const getJWT = async (key) => {
    var id = ''
    try {
        id = await client.get(key)
    } catch (err) {
        return err
    }
    return id
}

const deleteJWT = (key) => {
    try {
        client.del(key)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    setJWT,
    getJWT,
    deleteJWT
}