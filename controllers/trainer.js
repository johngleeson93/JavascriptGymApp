"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const trainerStore = require("../models/trainer-store.js");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    logger.info("trainer dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
      title: "Trainer Dashboard",
      assessments: assessmentStore.getAllAssessments(),
      members: memberStore.getAllMembers(),
    };
    response.render("trainerdashboard", viewData);
  },
  
  comment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    const comment = {
      comment: request.body.comment
    };
    logger.debug('Adding comment to ${assessmentId}', comment)
    trainerStore.comment(comment);
    response.redirect("/trainermemberview")
  }
};
  
module.exports = trainerdashboard;
