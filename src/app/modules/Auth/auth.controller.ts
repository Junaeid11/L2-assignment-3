import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req, res) => {
    const result = await authService.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    })
})

export const authController = {
    loginUser
}