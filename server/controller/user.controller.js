import { Booking } from "../model/Booking.model.js"
import { User } from "../model/user.model.js"
import { Listing } from "../model/Listing.model.js"

// Get all the trips list for a specific user
const GetTripsList = async (req, res) => {
    try {
        // Extract the userId parameter from the request parameters
        const { userId } = req.params
        // Find all bookings made by the user with the given userId and populate related information (customerId, hostId, listingId)
        const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
        // Send a successful response with status code 202 (Accepted) and the fetched trips in JSON format
        res.status(202).json(trips)
    } catch (err) {
        // If an error occurs during the process, log the error and send a response with status code 404 (Not Found)
        // along with a JSON object containing an error message
        console.log(err)
        res.status(404).json({ message: "Can not find trips!", error: err.message })
    }
}

// Add a listing to the user's wishlist
const AddToWishlist = async (req, res) => {
    try {
        // Extract the userId and listingId parameters from the request parameters
        const { userId, listingId } = req.params
        // Find the user by userId
        const user = await User.findById(userId)
        // Find the listing by listingId and populate the "creator" field
        const listing = await Listing.findById(listingId).populate("creator")

        // Check if the listing is already in the user's wishlist
        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

        if (favoriteListing) {
            // If the listing is already in the wishlist, remove it
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save()
            // Send a response indicating that the listing is removed from the wishlist
            res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList })
        } else {
            // If the listing is not in the wishlist, add it
            user.wishList.push(listing)
            await user.save()
            // Send a response indicating that the listing is added to the wishlist
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList })
        }
    } catch (err) {
        // If an error occurs during the process, log the error and send a response with status code 404 (Not Found)
        // along with a JSON object containing an error message
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

// Get properties listed by a specific user
const PropertiesList = async (req, res) => {
    try {
        // Extract the userId parameter from the request parameters
        const { userId } = req.params
        // Find all listings created by the user with the given userId and populate the "creator" field
        const properties = await Listing.find({ creator: userId }).populate("creator")
        // Send a successful response with status code 202 (Accepted) and the fetched properties in JSON format
        res.status(202).json(properties)
    } catch (err) {
        // If an error occurs during the process, log the error and send a response with status code 404 (Not Found)
        // along with a JSON object containing an error message
        console.log(err)
        res.status(404).json({ message: "Can not find properties!", error: err.message })
    }
}

// Get reservation list for properties listed by a specific user
const ReservationList = async (req, res) => {
    try {
        // Extract the userId parameter from the request parameters
        const { userId } = req.params
        // Find all bookings made for listings created by the user with the given userId and populate related information (customerId, hostId, listingId)
        const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
        // Send a successful response with status code 202 (Accepted) and the fetched reservations in JSON format
        res.status(202).json(reservations)
    } catch (err) {
        // If an error occurs during the process, log the error and send a response with status code 404 (Not Found)
        // along with a JSON object containing an error message
        console.log(err)
        res.status(404).json({ message: "Can not find reservations!", error: err.message })
    }
}

// Export all controller functions to make them accessible from other modules
export { GetTripsList, AddToWishlist, PropertiesList, ReservationList };
