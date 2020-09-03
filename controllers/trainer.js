"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const Utility = require("../controllers/utility.js")
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
  
  trainerAssessmentView(request, response) {
    logger.info("trainer member dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const member = request.params.id;
    const assessments = assessmentStore.getMemberAssessments(member);
    const viewData = {
      title: "Trainer Dashboard",
      trainer: loggedInTrainer,
      member: member,
      name: memberStore.getMemberById(member).name,
      assessments: assessments.reverse(),
      bmi: Utility.bmi(member),
      bmiCategory: Utility.bmiCategory(member),
      IdealWeight: Utility.IdealWeight(member)
    };
    response.render("trainerdashboard", viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect("/trainerdashboard");
  },
};
  
module.exports = trainerdashboard;