import { Router } from "express";
import { getProducts, getProductsRealTime } from "../controllers/views.controller.js";
import { addProduct } from "../controllers/views.controller.js";

const router = Router();


//Vista el home 

router.get("/home", getProducts) //vista de los productos en handlebars home 

//vista real de los productos 

router.get("/realTimeProducts", getProductsRealTime)
router.post("/realTimeProducts/add", addProduct);


export default router;

 