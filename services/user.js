const UserModel = require('@models/User')

function getUserByEmailAndPassword(email, password){
    return UserModel.findOne({ email: email, password: password }).lean()
}

function getUserByEmail(email){
    return UserModel.findOne({ email: email }).lean()
}

const createUser = async (createData) => {
    document = await UserModel.create(createData);
    return document;
};

const findOrCreate = async (query, createData) => {
    let document = await UserModel.findOne(query);
    if (!document) {
      document = await UserModel.create(createData);
    }
    return document;
};


module.exports = {
    getUserByEmailAndPassword,
    getUserByEmail,
    findOrCreate,
    createUser
}