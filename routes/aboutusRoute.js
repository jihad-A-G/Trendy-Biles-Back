import express from "express"
import * as aboutusController from '../Controllers/AboutUsController.js'
import upload from "../config/multer.js"
const router = express.Router()

//GET about us
router.get('/',aboutusController.getAboutus)
//GET about us content 
router.get('/content',aboutusController.getAboutUsContent)
//GET about us info or create one if doesn't exists
router.get('/info',aboutusController.getAboutUsInfo)
//PUT update about us or create if doesn't exist
router.put('/',upload.single('logoImage'),aboutusController.EditAboutus)

export default router


