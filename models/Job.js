const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: true
    }
});

module.exports = mongoose.model("Job", jobSchema);