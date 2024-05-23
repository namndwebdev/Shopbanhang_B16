var express = require('express');
var router = express.Router();
const { getAllUser } = require('@services/user')

router.get('/', async (req, res, next)=>{
    try {
        let data = await getAllUser()
        res.json(data)
    } catch (error) {
        return res.status(500).json('Khong the lay User')
    }
})


module.exports = router