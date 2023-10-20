const mongoose = require('mongoose')
const { formatDate } = require('../core/util/util')
const schema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  // 更新日期
  date: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val) {
      return formatDate(new Date(val), 'MM-dd')
    }
  }
})
schema.set('toJSON', { getters: true, virtuals: false });
module.exports = mongoose.model('Key', schema)