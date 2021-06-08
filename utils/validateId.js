const mongoose = require("mongoose");

module.exports = (id) => {
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  return isValidId;
};
