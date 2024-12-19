
import  Express  from "express"
import validateRequest from "../../middlewares/validateRequest"
import { ValidationSchema } from "./blog.validation"
import { blogController } from "./blog.controller"
import auth from "../../middlewares/auth"
import { ROLE } from "../User/user.constant"
const router = Express.Router()
 router.post('/',auth(ROLE.user), validateRequest(ValidationSchema.blogValidationSchema),blogController.createBlog)
 router.get('/', blogController.getAllBlogs)
 router.patch('/:id',auth(ROLE.user), validateRequest(ValidationSchema.blogUpdateValidationSchema), blogController.updateBlog)
 router.delete('/:id',auth(ROLE.user), blogController.deleteBlog)
 export const BlogRoute = router 