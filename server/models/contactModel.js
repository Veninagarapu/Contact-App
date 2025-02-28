const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  favorite: {
    type: Boolean,
    default: false, // Default is false (not a favorite)
  },

});

// Auto-incrementing ID
contactSchema.plugin(AutoIncrement, { inc_field: "id" });

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
