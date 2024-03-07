import { Listing } from "../model/Listing.model.js";
import { User } from "../model/user.model.js";
/* CREATE LISTING */
const CreateListing = async (req, res) => {
   try {
    const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      } = req.body;

      const listingPhotos = req.files

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.")
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path)

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    })

    await newListing.save()

    res.status(200).json(newListing)
     
   } catch (err) {
      res.status(409).json({ message: "Fail to create Listing", error: err.message })
      console.log(err)
    }
};
/* GET lISTINGS BY CATEGORY */
// This route is used when we click on the react-icons to get certain property
const GetListing = async(req,res) =>{
  const qCategory = req.query.category

  try {
    let listings
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator")
    } else {
      listings = await Listing.find().populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
}
/* GET LISTINGS BY SEARCH */
const GetListingBySearch = async(req,res)=>{
  const { search } = req.params;

try {
  let listings = [];

  // Check if the search parameter is 'all'
  if (search === "all") {
    // If 'all', retrieve all listings from the database and populate the 'creator' field
    listings = await Listing.find().populate("creator");
  } else {
    // If search parameter is not 'all', perform a filtered search based on category or title
    listings = await Listing.find({
      // Using $or operator to match documents that satisfy at least one of the conditions
      $or: [
        // Using regular expression to perform case-insensitive search on category
        { category: { $regex: search, $options: "i" } },
        // Using regular expression to perform case-insensitive search on title
        { title: { $regex: search, $options: "i" } },
      ]
    }).populate("creator");
  }

  // Sending the retrieved listings as a JSON response
  res.status(200).json(listings);
} catch (err) {
  // Handling errors by sending a 404 status code along with an error message
  res.status(404).json({ message: "Fail to fetch listings", error: err.message });
  console.log(err); // Logging the error for debugging purposes
}
}

const GetListingById = async(req,res)=>{
  try {
    const { listingId } = req.params
    const listing = await Listing.findById(listingId).populate("creator")
    res.status(202).json(listing)
  } catch (err) {
    res.status(404).json({ message: "Listing can not found!", error: err.message })
  }

}
export { CreateListing, GetListing , GetListingById ,GetListingBySearch};
