import { Booking } from "../model/Booking.model.js";
// Define an asynchronous function called CreateBooking to handle the creation of a new booking.
const CreateBooking = async (req, res) => {
  try {
    // Extract necessary information from the request body.
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    // Create a new instance of the Booking model with the extracted data.
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });

    // Save the newly created booking to the database asynchronously.
    await newBooking.save();

    // Send a response with status code 200 (OK) and the newly created booking in JSON format.
    res.status(200).json(newBooking);
  } catch (err) {
    // If an error occurs during the process, log the error and send a response with status code 400 (Bad Request)
    // along with a JSON object containing an error message.
    console.log(err);
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
  }
};

// Export the CreateBooking function to make it accessible from other modules.
export { CreateBooking };
