import config from "../config"
import { APPerror } from "../errors/AppError"
import { TRole } from "../modules/User/user.interface"
import catchAsync from "../utils/catchAsync"
import httpStatus from "http-status"
import  Jwt, { JwtPayload }  from "jsonwebtoken"


const auth= (...requiredUserRoles: TRole[])=>{
    return catchAsync(async(req,res,next) =>{
        const token = req.headers.authorization

        if(!token){
            throw new APPerror(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }
        Jwt.verify(token,config.jwt_access_secret as string,function(err,decoded){
            if(err){
                throw new APPerror(httpStatus.UNAUTHORIZED,'You are not Authorized')
            }
            const role = (decoded as JwtPayload).role
            if(requiredUserRoles && !requiredUserRoles.includes(role)){
                throw new APPerror(httpStatus.UNAUTHORIZED,'You are not Authorized')


            }
            const {id:_id} = (decoded as JwtPayload)
            
            if(req.params.id && _id !== req.params.id){
                console.log(`User ID: ${_id}, Requested ID: ${req.params.id}`);

                throw new APPerror(httpStatus.UNAUTHORIZED,'You are not authorized')
            }
           
           
             
            
            

           req.email = decoded as JwtPayload
           next()
        })


        

    })
}
export default auth