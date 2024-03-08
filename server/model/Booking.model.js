import mongoose,{Schema} from "mongoose";
const BookingSchema  = new Schema(
    {

       // Relation from all other database model
        customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        hostId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        listingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Listing",
        },
        startDate: {
          type: String,
          required: true,
        },
        endDate: {
          type: String,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true }
)
export const Booking = mongoose.model('Booking', BookingSchema);