const loginData = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (name == "") {
      return res.json({ message: "Name is required" });
    }
    if (password == "") {
      return res.json({ message: "Password is Required" });
    }
    res
      .json({
        message: `Data Recieved`,
      })
      .status(200);
  } catch (error) {
    res.json({ Error: error });
  }
};

export default loginData;
