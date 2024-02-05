import Notification from "../Models/notificationModel.js";

export const getAllNotificatiosn = async(req,res,next) =>{
    const notifications = await Notification.find({readStatus:false})

    if(!notifications){
        return res.statsus(200).json({message:'Empty!'})
    }

    res.status(200).json({status:200, notifications:notifications})
}

export const readNotification = async(req,res,next) =>{
    const {id} = req.params

    const notification = await Notification.findById(id)
    notification.readStatus = true

    await notification.save()
    res.status(200).json({message:'notification is read'})
}