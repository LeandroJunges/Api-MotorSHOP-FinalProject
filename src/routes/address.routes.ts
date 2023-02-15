import {Express} from "express"
import editAddressController from "../controllers/address/editAddress.controller"
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware"

const addressRoutes = (app: Express)=>{

    app.patch("/address", verifyAuthMiddleware, editAddressController)
}




export default addressRoutes