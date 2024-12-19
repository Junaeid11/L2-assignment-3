import { Router } from "express";
import userRouter from "../modules/User/user.router";
import { AuthRouter } from "../modules/Auth/auth.route";
import { BlogRoute } from "../modules/Blog/blog.route";
import { AdminRoute } from "../modules/admin/admin.route";
const router = Router()
const moduleRoutes =[
    {
        path: '/auth',
        route: userRouter
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/blogs',
        route: BlogRoute,
    },   
    {
        path: '/admin',
        route: AdminRoute,
    },   
]


moduleRoutes.forEach(route =>{
    router.use(route.path, route.route)
})

export default router