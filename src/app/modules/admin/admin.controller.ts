import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "../Blog/blog.service";
import { adminService } from "./admin.service";

const deleteBlog = catchAsync(async (req, res)=>{
    const {id} = req.params
        await blogService.deleteBlogFromDb(id);
    sendResponse(res,{
        statusCode:200,
        success: true,
        message:"Blog deleted Successfully",
        data:{}
        
    })
})
const blockUser = catchAsync(async (req, res) => {
    const {id} = req.params
     await adminService.blockUserFromDb(id);
     sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "User blocked successfully",
        
    })})
export const adminController = {
    deleteBlog,
    blockUser
}