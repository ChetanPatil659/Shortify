import bcrypt from 'bcrypt'

const saltRounds = 10

export const createHash = (value) => bcrypt.hashSync(value, saltRounds)

export const compareHash = (value, hash) => {
    bcrypt.genSaltSync(saltRounds)
    return bcrypt.compareSync(value, hash)
}