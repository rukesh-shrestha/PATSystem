const adminBoard = (req, res) => {
  res.status(200).json({ message: "Welccome to  Admin Dashboard" });
};

const superAdminBoard = (req, res) => {
  res.status(200).json({ message: "Welcome to Super Admin Dashboard" });
};

const staffBoard = (req, res) => {
  res.status(200).json({ message: "Welcome to Staff Dashboard" });
};

module.exports = { superAdminBoard, adminBoard, staffBoard };
