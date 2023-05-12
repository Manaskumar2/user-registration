const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    enum: ["MALE", "FEMALE", "OTHERS"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
      type: String,
      unique: true,
    },
 isDeleted: {
    type: Boolean,
     default: false,
  },

  password: {
    type: String,
  },

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)