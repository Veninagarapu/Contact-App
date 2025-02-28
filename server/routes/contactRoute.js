const express = require('express');
const { getContacts, getContactById, createContact, updateContact, deleteContact, deleteAllContacts, toggleFavorite } = require('../controllers/contactController');
const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/:id', getContactById);  
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);    
router.delete('/contacts/', deleteAllContacts);    
// Toggle the favorite status of a contact
router.put('/contacts/:id/favorite', toggleFavorite);

module.exports = router;


// import express from 'express';
// import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactController';

// router.route('/contacts/:id')
//   .get(getContactById)    // GET request for a single contact by ID
//   .put(updateContact)     // PUT request to update the contact by ID
//   .delete(deleteContact); // DELETE request to remove the contact by ID
