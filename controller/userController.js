const userHome = (req, res) => {
  res.status(200).json({
    message: "Rendering Message From Controller",
  });
};

module.exports = userHome;
