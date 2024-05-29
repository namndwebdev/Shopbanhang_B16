const { verifyToken } = require('@helper/jwt')
const checkAuth = (req, res, next)=>{
    try {
        let token = req.headers.authorization
        if(token){
            token = token?.split(' ')[1]
            let data = verifyToken(token)
            if(data){
                req.user = data
                next()
            }
        }else{
            return res.status(401).json('Ban chua dang nhap')
        }
    } catch (error) {
        return res.status(401).json('Token khong hop le')
    }
}

const checkAdmin = (req, res, next)=>{
    if(req.user.role === 'admin'){
        next()
    }else{
        return res.status(403).json('ban khong co quyen su dung api')
    }
}

module.exports = {
    checkAuth,
    checkAdmin
}