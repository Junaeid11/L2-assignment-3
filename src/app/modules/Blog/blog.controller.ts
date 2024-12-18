import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";

const createBlog = catchAsync(async (req, res)=>{
    const result = await blogService.createBlogIntoDb(req.body);
    sendResponse(res,{
        statusCode:201,
        success: true,
        message:"Blog created Successfully",
        data: result
    })
})
const updateBlog = catchAsync(async (req, res)=>{
    const {id} = req.params
    const result = await blogService.updateBlogFromDb(id,req.body);
    sendResponse(res,{
        statusCode:200,
        success: true,
        message:"Blog updated Successfully",
        data: result
    })
})
const deleteBlog = catchAsync(async (req, res)=>{
    const {id} = req.params
    const result = await blogService.deleteBlogFromDb(id);
    sendResponse(res,{
        statusCode:200,
        success: true,
        message:"Blog deleted Successfully",
        data:result
        
    })
})
const getAllBlogs = catchAsync(async (req, res)=>{
    const result = await blogService.getAllBlogsFromDb();
    sendResponse(res,{
        statusCode:200,
        success: true,
        message:"Blogs fetched successfully",
        data: result
    })
})




export const blogController ={
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}