import { userService } from "../services";

const userServiceInstance = new userService();

const registerController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    console.log(fullname, email, password);

    const result = await userServiceInstance.createUser({
      fullname,
      email,
      password,
    });
    if (result.success) {
      return res
        .status(201)
        .json({ message: "User registered successfully", user: result.user });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userServiceInstance.login({ email, password });

    if (!result.success) {
      return res
        .status(400)
        .send({ success: result.success, message: result.message });
    }
    res.cookie("token", result.data.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const dashBoardController = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await userServiceInstance.getUserDetails(email);
    if (!result.success) {
      return res
        .status(400)
        .send({ success: result.success, message: result.message });
    }
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerController, loginController,dashBoardController};
