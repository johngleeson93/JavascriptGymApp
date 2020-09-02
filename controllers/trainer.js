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
    response.render("trainermemberview", viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect("/trainerdashboard");
  },
  
  
  comment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const assessmentId = request.params.assessmentid;
    const assessment = assessmentStore.getSingleAssessment(memberId, assessmentId)
    const comment = {
      comment: request.body.comment,
    };
    logger.debug(`Updating Assessment from Member ${memberId}`);
    assessmentStore.comment(assessment, comment);
    response.redirect("/trainerassessmentview/" + member);
  }
};
  
module.exports = trainerdashboard;