import mongoose from "mongoose";

const propertyRequirementSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["Buy", "Rent"],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: Number,
      required: true,
    },

    minBudget: {
      type: Number,
      required: true,
    },

    maxBudget: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    requirements: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PropertyRequirement = mongoose.model(
  "PropertyRequirement",
  propertyRequirementSchema,
);

export default PropertyRequirement;
