import { Router } from "express";
import multer from "multer";
import {CreateListing , GetListing , GetListingById , GetListingBySearch} from "../controller/Listing.controller.js";
// User routes
const Listing = Router();
/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
    // Use the original file name
  },
});
const upload = multer({ storage });
Listing.post("/create",upload.array("listingPhotos"),CreateListing);
Listing.get("/",GetListing);
Listing.get("/:listingId",GetListingById)
Listing.get("/search/:search",GetListingBySearch)
export default Listing;