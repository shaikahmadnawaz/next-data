import Data from "../models/data.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

const createData = asyncHandler(async (req, res) => {
  const { name, phoneNumber, email, hobbies } = req.body;

  if (!name || !phoneNumber || !email || !hobbies) {
    throw new ApiError(400, "All fields are required");
  }

  const existedData = await Data.findOne({ email });

  if (existedData) {
    throw new ApiError(400, "Email already exists");
  }

  const data = await Data.create(req.body);

  if (!data) {
    throw new ApiError(400, "Data not created");
  }

  const allData = await Data.find({}).sort({ createdAt: -1 });

  return res
    .status(201)
    .json(new ApiResponse(200, { allData }, "Data created"));
});

const getData = asyncHandler(async (req, res) => {
  const allData = await Data.find({}).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { allData }, "Data fetched"));
});

const updateData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Data.findById(id);

  if (!data) {
    throw new ApiError(404, "Data not found");
  }

  const updatedData = await Data.findByIdAndUpdate(id, req.body);

  if (!updatedData) {
    throw new ApiError(400, "Data not updated");
  }

  const allData = await Data.find({}).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { allData }, "Data updated"));
});

const deleteData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Data.findById(id);

  if (!data) {
    throw new ApiError(404, "Data not found");
  }

  const deletedData = await Data.findByIdAndDelete(id);

  if (!deletedData) {
    throw new ApiError(400, "Data not deleted");
  }

  const allData = await Data.find({}).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { allData }, "Data deleted"));
});

const getSingleData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Data.findById(id);

  if (!data) {
    throw new ApiError(404, "Data not found");
  }

  return res.status(200).json(new ApiResponse(200, { data }, "Data fetched"));
});

const sendDataByEmail = asyncHandler(async (req, res) => {
  const { selectedRows } = req.body;

  if (!selectedRows || selectedRows.length === 0) {
    throw new ApiError(400, "No data selected");
  }

  const selectedData = await Data.find({ _id: { $in: selectedRows } });

  if (!selectedData) {
    throw new ApiError(404, "Data not found");
  }

  const emailContent = selectedData
    .map((data) => {
      return `
        Name: ${data.name}
        Phone Number: ${data.phoneNumber}
        Email: ${data.email}
        Hobbies: ${data.hobbies.join(", ")}
      `;
    })
    .join("\n\n");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER,
    to: process.env.RECEIVER,
    subject: "Data",
    text: emailContent,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new ApiError(400, "Email not sent");
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { selectedData }, "Email sent"));
});

export {
  createData,
  getData,
  updateData,
  deleteData,
  getSingleData,
  sendDataByEmail,
};
