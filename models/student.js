var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://alcapi:andelaalc@ds147534.mlab.com:47534/studsource', {
    useMongoClient: true,
});

var studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;