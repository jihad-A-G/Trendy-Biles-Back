import AboutUs from "../Models/AboutusModel.js";

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
            aboutus = await AboutUs.create({content:'', companyName:'Trendy Biles', logoImage:null})      
            return res.status(200).json({status:200, aboutus})      
        }
        res.status(200).json({status:200, aboutus})
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:'Cannot load About us info'})
    }
}
export const EditAboutus = async(req,res,next) =>{
    const {content,companyName} = req.body
    const logoImage = req.file
    try{
    if(!content || !companyName || !logoImage.path){
        return res.status(400).json({status:400, message:'All filed are required!'})
    }
    var aboutus = await AboutUs.findOne()
    if(!aboutus) {
        aboutus = await AboutUs.create({content: content, logoImage: logoImage.path, companyName: companyName})
        return res.status(200).json({status:200, message:'Aboutus Added successfully'})
    }
    aboutus.content = content
    aboutus.logoImage = logoImage.path
    aboutus.companyName = companyName
    await aboutus.save()
    res.status(200).json({status:200, message:'Aboutus Updated successfully!'})
}catch(err){
    console.log(err);
    res.status(500).json({status:500, message:'Cannot update Aboutus'})
}
}