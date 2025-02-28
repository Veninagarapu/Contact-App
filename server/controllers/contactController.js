const Contact = require("../models/contactModel");

// 📌 Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetches all contacts
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContactById = async (req, res) => {
    try {
        // Make sure to query by 'id', not '_id'
        const contact = await Contact.findOne({ id: req.params.id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new contact
const createContact = async (req, res) => {
    const { id, name, email, phone, favorite } = req.body;
    
    // Create a new contact
    const contact = new Contact({
      id,
      name,
      email,
      phone,
      favorite: favorite || false, // Set favorite to false by default if not provided
    });
  
    try {
      const newContact = await contact.save();
      res.status(201).json(newContact);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Edit an existing contact
  const updateContact = async (req, res) => {
    try {
      const contact = await Contact.findOne({ id: req.params.id });
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Update contact fields
      contact.name = req.body.name || contact.name;
      contact.email = req.body.email || contact.email;
      contact.phone = req.body.phone || contact.phone;
      contact.favorite = req.body.favorite !== undefined ? req.body.favorite : contact.favorite; // Toggle favorite if specified
  
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };



// 📌 Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ id: req.params.id });
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📌 Delete all contact
const deleteAllContacts = async (req, res) => {
    try {
        const contact = await Contact.deleteMany();
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contacts deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Toggle the favorite status of a contact
const toggleFavorite = async (req, res) => {
    try {
      const contact = await Contact.findOne({ id: req.params.id });
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Toggle the favorite field
      contact.favorite = !contact.favorite;
  
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    deleteAllContacts,
    toggleFavorite
};
