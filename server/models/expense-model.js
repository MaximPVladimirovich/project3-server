const mongoose = require(`mongoose`)

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required'
  },
  amount: {
    type: Number,
    min: 0,
    required: 'Amount is required'
  },
  catagory: {
    type: String,
    trim: true,
  },
  incurred_on: {
    type: Date,
    default: Date.now
  },
  recorded_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Expense', ExpenseSchema)