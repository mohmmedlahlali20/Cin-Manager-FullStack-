const mongoss = require('mongoose')



const seanceSchema = new mongoss.Schema({
    salleId : {
        type: mongoss.Schema.Types.ObjectId,
        ref : salle,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    duration : {
        type : Date,
        require : true
    },

})


module.exports = mongoss.model('seance', seanceSchema);