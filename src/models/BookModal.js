import BookSchema from "./books/BookSchema";
// insert
export const insertBook = (obj) => {
  return BookSchema(obj).save();
};

// Read all
export const getAllBook = (filter) => {
  return BookSchema.find(filter);
};

// get book by id
export const getABookById = (_id) => {
  return BookSchema.findById(_id);
};

// update book by id
export const updateABookById = (_id, obj) => {
  return BookSchema.findByIdAndUpdate(_id, obj);
};

// delete book by id
export const deleteABookById = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
