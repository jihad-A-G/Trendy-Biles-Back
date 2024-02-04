import AboutUs from "../Models/AboutusModel.js";

export const getAboutus = async(req,res,next) =>{
    try{
        const aboutus = await AboutUs.findOne()
        if(!aboutus){
            return res.status(404).json({status:404,message:'No content found!'})
        }
        res.status(200).json({status:200,aboutus})
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Cannot load Aboutus',status:500})
    }
}

export const getAboutUsContent = async(req,res,next) =>{
    try{
        const aboutusContent = await AboutUs.findOne({}).select('content')
        if(!aboutusContent){
            return res.status(404).json({status:404,message:"No content was found!"})
        }
        res.status(200).json({aboutusContent})
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Cannot load About us content',status:500})
    }
}

export const getAboutUsInfo = async(req,res,next) =>{
    var aboutus = null
    try{
         aboutus = await AboutUs.findOne()
        if(!aboutus){
            aboutus = await AboutUs.create({content:'', companyName:'Trendy Biles', logoImage:'images/Screenshot 2023-12-02 121409.png'})      
            return res.status(200).json({status:200, aboutus})      
        }
        res.status(200).json({status:200, aboutus})
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:'Cannot load About us info'})
    }
}
export const EditAboutus = async(req,res,next) =>{
    const {content,companyName,defaultImage} = req.body
    const logoImage = req.file
    try{
    if(!content || !companyName){
        return res.status(400).json({status:400, message:'All filed are required!'})
    }
   const aboutus = await AboutUs.findOneAndUpdate({},{companyName:companyName, content:content, logoImage:logoImage?.path??defaultImage})
    res.status(200).json({status:200, message:'Aboutus Updated successfully!'})
}catch(err){
    console.log(err);
    res.status(500).json({status:500, message:'Cannot update Aboutus'})
}
}