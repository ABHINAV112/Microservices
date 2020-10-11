const { User } = require(".");

const findShit = async () => {
  const result = await User.findOne({
    where: { identifier: "nabhinav2000@gmail.com" },
  });
  console.log(result);
};

findShit();
