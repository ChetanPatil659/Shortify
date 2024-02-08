import Url from "../models/UrlModel.js";
import generator from 'generate-password'

//create
export const createUrl = async (payload) => {
    try {
        const urlCode = generator.generate({
            length: 8,
        })
        let url = new Url({
            ...payload,
        })
        url.urlCode = urlCode
        url = await url.save()
        return url
    }
    catch (error) {
        Error(error)
    }
}

//get 
export const getUrlByUrlCode = async (urlCode) => {
    try {
        let data = await Url.findOne({ urlCode });
        data.visitCount = data.visitCount + 1;
        return await Url.findOneAndUpdate({ urlCode: urlCode }, data);
    } catch (error) {
        console.log(error);
        Error(error);
    }
};

export const getUrlsForUser = async(userId)=>{
    try {
        const urls = await Url.find({userId: userId}).exec()
        return urls
    } catch (error) {
        throw new Error('internal server error')
    }
}

export const deleteUrlByUrlCode = async(urlCode)=>{
    try {
        const deleted = await Url.deleteOne({urlCode})
        return 'deleted successfully'
    } catch (error) {
        console.log(error)
        Error(error)
    }
}

export const updateUrl = async(payload)=>{
    if(!payload.urlCode) throw Error('invalid url code')
    try {
        let data = await Url.findOne({urlCode: payload.urlCode})
        const editableField = ['name', 'originalLink']
        Object.keys(payload).forEach((key)=>{
            if(editableField.includes(key)){
                data[key] = payload[key]
            }
        })

        return await Url.findOneAndUpdate({urlCode: payload.urlCode}, data)
    } catch (error) {
        console.log(error)
        Error(error)
    }
}