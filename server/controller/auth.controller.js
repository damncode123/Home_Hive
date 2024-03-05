import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";


/* USER REGISTER */
const Register = async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    /* Hash the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
};
/* USER LOGIN*/
const login = async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    /* Compare the password with the hashed password */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

/* Generate JWT token */
//const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);: This line generates a JSON Web Token (JWT) using the jwt.sign method. It typically includes a payload (in this case, { id: user._id }), which is often the user's unique identifier, and a secret key (process.env.JWT_SECRET) used for signing the token. This token is then stored in the token variable.

// delete user.password;: This line deletes the password field from the user object. This is commonly done for security reasons to ensure that sensitive information like passwords is not sent to the client.

// res.status(200).json({ token, user });: This line sends a response to the client with a status code of 200 (OK) and a JSON object containing the token and user data. The token is typically sent back to the client for subsequent authenticated requests, while the user data can be used to update the user's session or display user information on the client side.

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export { Register, login };
