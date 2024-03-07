import {Router} from "express"
import { GetTripsList , AddToWishlist } from "../controller/user.controller.js";
const User= Router();
User.get("/:userId/trips",GetTripsList);
User.patch("/:userId/:listingId",AddToWishlist)
export default User;