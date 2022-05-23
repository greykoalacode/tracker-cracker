const express = require("express");
const Schedule = require("../model/Schedule");
const User = require("../model/User");
const router = express.Router();
const verify = require("./verifyToken");
const dateToNumber = require("../utils");

router
  .route("/")
  .get(verify, async (req, res) => {
    try {
      const schedules = await Schedule.find({_id: req.user._id}).populate("workouts.exercise");
      return res.send(schedules);
    } catch (error) {
      return res.send(error);
    }
  })
  .post(verify, async (req, res) => {
    try {
      const { _id } = req.user;
      const { date, description, workouts } = req.body;
      // const modifiedDate = moment(date, "DD-MM-YYYY").format("MM-DD-YYYY");
      const modifiedDate = dateToNumber(date);
      // console.log(date, modifiedDate)
      const existingSchedule = await Schedule.findOne({
        userID: _id,
        date: modifiedDate,
      });
      if (existingSchedule) {
        return res
          .status(405)
          .send("POST request can not be made for PUT request");
      }
      const newSchedule = await new Schedule({
        userID: _id,
        date: modifiedDate,
        description: description || "",
        workouts: workouts,
      }).save();
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            schedules: newSchedule,
          },
        },
        { new: true }
      );
      const schedules = await Schedule.find({ userID: _id }).populate(
        "workouts.exercise"
      );

      return res.json(schedules);
    } catch (error) {
      return res.send(error);
    }
  })
  .delete(verify, async (req, res) => {
    try {
      //   Check if Schedules exist first

      const { _id } = req.user;
      const user = await User.findById(_id).populate("schedules");
      // // console.log(user.schedules);
      if (user.schedules.length <= 0) {
        return res.status(400).send("No Schedules exist for this user.");
      }

      const deleteSchedule = await Schedule.deleteMany({ userID: _id });
      // // console.log(deleteSchedule);
      if (deleteSchedule.deletedCount === 1) {
        const deleteFromUser = await User.findByIdAndUpdate(_id, {
          $set: { schedules: [] },
        });
        // if (deleteFromUser) {
        return res.status(200).send("Schedules Deleted Successfully");
        // }
      }
    } catch (error) {
      return res.send(error);
    }
  });

router
  .route("/:id")
  .get(verify, async (req, res) => {
    try {
      const { _id } = req.user;
      const { id } = req.params;
      const scheduleDoesExist = await Schedule.findOne({
        id: id,
        userID: _id,
      }).populate("workouts.exercise");
      if (!scheduleDoesExist) {
        return res
          .status(400)
          .send(
            "Schedule Does not exist / User does not have the specific Schedule"
          );
      }

      return res.json(scheduleDoesExist);
    } catch (error) {
      return res.send(error);
    }
  })
  .put(verify, async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
      const { date, description, workouts } = req.body;
      // const modifiedDate = moment(date, "DD-MM-YYYY").format("MM-DD-YYYY");
      const modifiedDate = dateToNumber(date);
      const scheduleWithDateExists = await Schedule.findOne({
        _id: id,
        userID: _id,
        date: modifiedDate,
      });
      if (!scheduleWithDateExists) {
        return res
          .status(400)
          .send("Schedule for the particular date / user does not exist");
      }
      const changedSchedule = await Schedule.findOneAndUpdate(
        {
          _id: id,
          userID: _id,
          date: modifiedDate,
        },
        {
          description: description,
          workouts: workouts,
        },
        {
          new: true,
        }
      ).populate("workouts.exercise");
      // // console.log(changedSchedule);
      return res.json(changedSchedule);
    } catch (error) {
      return res.send(error);
    }
  })
  .delete(verify, async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
      //   Check schedule exists
      const schedule = await Schedule.findOne({ _id: id, userID: _id });
      // // console.log(schedule);
      if (!schedule) {
        return res.status(400).send("This Particular Schedule does not exist");
      }
      const user = await User.findById(_id).populate("schedules");
      if (user.schedules.length <= 0) {
        return res.status(400).send("The User does not have any schedule");
      }
      //   Check if user has this particular schedule
      const particularSchedule = User.findOne({
        _id: _id,
        schedules: { $in: [id] },
      });
      if (!particularSchedule) {
        return res
          .status(400)
          .send("This particular schedule of user does not exists");
      }
      //   actual process for deleting a schedule
      const deleteSchedule = await Schedule.deleteOne({ _id: id, userID: _id });
      if (deleteSchedule.deletedCount === 1) {
        const removeFromUser = await User.findByIdAndUpdate(_id, {
          $pull: { schedules: id },
        });
        const updatedSchedules = await Schedule.find({ userID: _id }).populate(
          "workouts.exercise"
        );

        return res.json(updatedSchedules);
      }
    } catch (error) {
      return res.send(error);
    }
  });

module.exports = router;
