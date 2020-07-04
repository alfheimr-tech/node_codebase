const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc      Get All users
// @route     GET /api/v1/auth/register
// @access    Private.Admin

exports.getUsers = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get Single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin

exports.getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`No user found with ID: ${req.body.id}`));
    }

    res.status(200).json({
        status: true,
        data: user,
    });
});

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin

exports.createUser = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body);

    res.status(200).json({
        status: true,
        data: user,
    });
});

// @desc      Update user
// @route     PUT /api/v1/auth/users
// @access    Private/Admin

exports.updateUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: true,
        data: user,
    });
});

// @desc      Delete user
// @route     DELETE /api/v1/auth/users
// @access    Private/Admin

exports.deleteUser = asyncHandler(async(req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: true,
        data: {},
    });
});