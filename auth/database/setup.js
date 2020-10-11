const { User } = require(".");

// // This checks what is the current state of the table in the database
// // (which columns it has, what are their data types, etc), and then
// // performs the necessary changes in the table to make it match the model.
// User.sync({ force: true });
User.sync({ force: true });
