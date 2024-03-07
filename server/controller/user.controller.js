import {Booking} from "../model/Booking.model.js"
import {User} from "../model/user.model.js"
import {Listing} from "../model/Listing.model.js"
// get all the trip list
const GetTripsList=async(req,res)=>{
    try {
        const { userId } = req.params
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
        res.status(202).json(trips)
      } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Can not find trips!", error: err.message })
      }
}

// Add to the wishlist page 

const AddToWishlist = async(req,res)=>{
  try {
    const { userId, listingId } = req.params
    const user = await User.findById(userId)
    const listing = await Listing.findById(listingId).populate("creator")
    // console.log(user,listing);

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
      await user.save()
      res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList})
    } else {
      user.wishList.push(listing)
      await user.save()
      res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList})
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: err.message })
  }
}
const PropertiesList = async(req,res)=>{
  try {
    const { userId } = req.params
    const properties = await Listing.find({ creator: userId }).populate("creator")
    res.status(202).json(properties)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find properties!", error: err.message })
  }
}

export {GetTripsList,AddToWishlist,PropertiesList};