const express = require("express");
const mongoose = require("mongoose");
const inputTypes = require("./inputTypes/comment");
const DateTime = require("luxon").DateTime;
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const CommentModel = mongoose.model("Comment");

router.route("/").get(async (req, res) => {
  try {
    const comments = await CommentModel.find();
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched comments successfully",
      comments: comments,
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      msg: "failed to fetch comments",
      error: err,
    });
  }
});

router
  .route("/new")
  .all(requireLogin, (req, res, next) => {
    next();
  })
  .post(async (req, res) => {
    const validation = validateInputs(req.body);
    if (validation.isValid) {
      const newComment = new CommentModel({
        user_id: req.body.user_id,
        target_id: req.body.target_id,
        content: req.body.content,
        date: DateTime.local(),
      });
      try {
        const saved = await newComment.save();
        return res.status(200).json({
          status: "SUCCESS",
          msg: "created a new comment successfully",
          comment: saved,
        });
      } catch (err) {
        return res.status(500).json({
          status: "FAIL",
          msg: "failed to create a comment",
          error: err,
        });
      }
    }
    return res
      .status(300)
      .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid)
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    try {
      const comment = await CommentModel.findOne({ _id: id });
      return res.status(200).json({
        status: "SUCCESS",
        msg: "fetched the comment successfully",
        comment,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ staus: "FAIL", msg: "failed to fetch the comment" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid)
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    const validation = validateInputs(req.body);
    if (validation.isValid) {
      const updates = {
        user_id: req.body.user_id,
        target_id: req.body.target_id,
        content: req.body.content,
        date: DateTime.local(),
      };
      const options = { new: true, useFindAndModify: false };
      const updated = await CommentModel.findOneAndUpdate(
        {
          _id: id,
        },
        updates,
        options
      ).exec();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "updated the comment successfully",
        comment: updated,
      });
    }
    return res
      .status(300)
      .json({ status: "FAIL", msg: `invalid input: ${validation.type}` });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid)
      return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
    try {
      const deleted = await CommentModel.findOneAndRemove({ _id: id }).exec();
      return res.status(200).json({
        status: "SUCCESS",
        msg: "deleted the comment successfully",
        comment: deleted,
      });
    } catch (err) {
      return res.status(500).json({ status: "FAIL", msg: "failed to delete" });
    }
  });

router.route("/user/:id").get(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid)
    return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
  try {
    const comments = await CommentModel.find({ user_id: id });
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched comments by user id",
      comments,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "FAIL", msg: "failed to fetch comments by user id" });
  }
});

router.route("/target/:id").get(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid)
    return res.status(300).json({ status: "FAIL", msg: "invalid id format" });
  try {
    const comments = await CommentModel.find({ target_id: id });
    return res.status(200).json({
      status: "SUCCESS",
      msg: "fetched comments by target id",
      comments,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "FAIL", msg: "failed to fetch comments by target id" });
  }
});

const validateInputs = ({ user_id, target_id, content }) => {
  if (!user_id) return { isValid: false, type: inputTypes.USER_ID };
  if (!target_id) return { isValid: false, type: inputTypes.TARGET_ID };
  if (!content) return { isValid: false, type: inputTypes.CONTENT };
  return { isValid: true, type: null };
};

module.exports = router;
