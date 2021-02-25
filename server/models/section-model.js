const mongoose = require('mongoose');
const Section = mongoose.model('Section', new mongoose.Schema());

module.exports = Section;