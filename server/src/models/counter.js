const {Schema, model: Model} = require('mongoose');

const counterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
})


const Counter = new Model("Counter" ,{counterSchema})

new Counter({})();

module.exports = Counter;