require("dotenv").config();

module.exports = {
  env: {
    REACT_APP_BACK_END_BASE_URL: process.env.REACT_APP_BACK_END_BASE_URL,
    REACT_APP_FRONT_END_BASE_URL: process.env.REACT_APP_FRONT_END_BASE_URL,
  },
  trailingSlash: true,
};
