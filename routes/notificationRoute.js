import express from "express";
import * as NotificationController from '../Controllers/NotificationController.js'

const router = express.Router()

router.get('/',NotificationController.getAllNotificatiosn)

router.get('/:id', NotificationController.readNotification)

export default router