import {Router} from "express"
import { GetTripsList , AddToWishlist , PropertiesList } from "../controller/user.controller.js";
const User= Router();
User.get("/:userId/trips",GetTripsList);
User.patch("/:userId/:listingId",AddToWishlist)
User.get("/:userId/properties",PropertiesList)
export default User;