import prisma from "../utils/userDatabaseService.mjs";

export const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    //check if user's email is already existed in database
    const isEmailUsed = await prisma.findUnique({
      where: {
        email,
      },
    });
    if (isEmailUsed)
      return res
        .status(409)
        .json({ message: "This email is already used, Try with another one" });

    //add user into database
    const newUser = await prisma.create({
      data: req.body,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.findMany();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const findUserById = await prisma.findUnique({
      where: {
        id: +id,
      },
    });

    if (!findUserById)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json(findUserById);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const {
    params: { id },
    body: { email },
  } = req;
  try {
    const findUserById = await prisma.findUnique({
      where: {
        id: +id,
      },
    });

    if (!findUserById)
      return res.status(404).json({ message: "User not found to update" });

    //check if email is already exist in database
    const isEmailUsed = await prisma.findUnique({
      where: {
        email,
      },
    });

    if (isEmailUsed)
      return res.status(409).json({
        message:
          "This email is already used, maybe this is the same with previous,",
      });

    //update user
    const updateUserById = await prisma.update({
      where: {
        id: +id,
      },
      data: req.body,
    });
    return res.status(200).json(updateUserById);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const findUserById = await prisma.findUnique({
      where: {
        id: +id,
      },
    });

    if (!findUserById)
      return res.status(404).json({ message: "User not found to delete" });

    const deleteUserById = await prisma.delete({
      where: {
        id: +id,
      },
    });
    return res.status(200).json({
      data: deleteUserById,
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
