import {Router} from "express"
import { GetTripsList , AddToWishlist , PropertiesList , ReservationList } from "../controller/user.controller.js";
const User= Router();
User.get("/:userId/trips",GetTripsList);
User.patch("/:userId/:listingId",AddToWishlist)
User.get("/:userId/properties",PropertiesList)
User.get("/:userId/reservations",ReservationList)
export default User;