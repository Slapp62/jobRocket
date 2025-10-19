const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    middle: {
      type: String,
      maxLength: 256,
      default: "",
    },
    last: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  phone: {
    type: String,
    required: true,
    match: [
      /^(\+972[-\s]?|972[-\s]?|0)((2|3|4|8|9)[-\s]?\d{7}|5[0-9][-\s]?\d{7})$/,
      "Phone must be a valid Israeli phone number",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  loginTimeout: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    url: {
      type: String,
      default: "https://images.unsplash.com/vector-1748280445815-10a4bb2ba7e3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    alt: {
      type: String,
      default: "fox avatar",
      maxLength: 256,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  address: {
    state: {
      type: String,
      default: "",
      maxLength: 256,
    },
    country: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    city: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    street: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = model("Users", userSchema);
module.exports = Users;
