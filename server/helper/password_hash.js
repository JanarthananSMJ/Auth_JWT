import bcryptjs from "bcryptjs";

const encryptPassword = async (userpassword) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const encrypt_password = await bcryptjs.hash(userpassword, salt);
    return encrypt_password;
  } catch (error) {
    console.log(`Error on Hashing Password : ${error}`);
  }
};

const verifyPassword = async (userpassword, password) => {
  try {
    return await bcryptjs.compare(userpassword, password);
  } catch (error) {
    console.log(`Error on decrypt Password : ${error}`);
  }
};

export { encryptPassword, verifyPassword };
