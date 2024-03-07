import {Router} from "express"
import { GetTripsList } from "../controller/user.controller.js";
const User= Router();
User.get("/:userId/trips",GetTripsList);
export default User;