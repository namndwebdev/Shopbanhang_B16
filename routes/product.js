const {createProduct, getProduct, getTotalProduct, getProductById} = require('@services/product')
var express = require('express');
var router = express.Router();
const path = require('path')
const multer  = require('multer')
const fs = require('fs')
const PATH_UPLOAD = path.join(__dirname,'../uploads')
const PATH_AVATAR_UPLOAD = path.join(__dirname,'../uploads/product')

if(!fs.existsSync(PATH_UPLOAD)){
    fs.mkdirSync(PATH_UPLOAD)
}
if(!fs.existsSync(PATH_AVATAR_UPLOAD)){
    fs.mkdirSync(PATH_AVATAR_UPLOAD)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, PATH_AVATAR_UPLOAD)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
})

const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.get('/', async (req, res, next)=>{
    try {
        let {page, pageSize, sort} = req.query
        // validate page, pageSize, sort

        let p1 = getProduct(page, pageSize, sort)
        let p2 = getTotalProduct()
        let data = await p1
        let total = await p2
        res.json({
            data: data,
            pagination: {
                page,
                total,
                pageSize 
            }
        })
    } catch (error) {
        return res.status(500).json('khong the lay SP')
    }
})

router.get('/:idProduct', async (req, res, next)=>{
    try {
        let data = await getProductById(req.params.idProduct)
        return res.json(data)
    } catch (error) {
        return res.status(500).json('Khong the lay san pham')
    }
})

router.post('/', cpUpload ,async (req, res, next)=>{
    try {
        let {image, gallery} = req.files
        image = image[0] ? `/uploads/product/${image[0].filename}` : ""
        gallery = gallery.map(item=>{
            return `/uploads/product/${item.filename}`
        })
        let newProduct = {
            ...req.body,
            image,
            gallery
        }
        let data = await createProduct(newProduct)
        res.json(data)
    } catch (error) {
        return res.status(500).json('khong the them san pham')
    }
})

router.put('/:id', (req, res, next)=>{
    res.json("sua 1 product")
})

router.delete('/:id', (req, res, next)=>{
    res.json("Xoa 1 product")
})

module.exports = router