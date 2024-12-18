import { TBlog } from "./blog.interface"
import { BlogModel } from "./blog.model"


const createBlogIntoDb = async (payload: TBlog) => {
    const result = await BlogModel.create(payload)
    const userData = await BlogModel.findById(result._id).populate('author', 'name email role isBlocked')
    return userData

}
const updateBlogFromDb = async(id:string,payload:TBlog)=>{
    const result= await BlogModel.findByIdAndUpdate(id,payload,{new:true}).populate('author')
    return result
}
const deleteBlogFromDb = async(id:string)=>{
    const result = await BlogModel.findByIdAndDelete(id)
    return result
}
const getAllBlogsFromDb = async ()=>{
    const result = await BlogModel.find().populate('author')
    return result
}


export const blogService = {
    createBlogIntoDb,
    updateBlogFromDb,
    deleteBlogFromDb,
    getAllBlogsFromDb
}