const mongoose = require('mongoose')

const schema = mongoose.Schema;

const NotesSchema= new schema(
    {
        prompt: {
           type: String,
           required : true,
        },

        response: String
    },{
        timestamps: true,
    }
)

const Notes = mongoose.model('notes', NotesSchema)

module.exports = Notes;