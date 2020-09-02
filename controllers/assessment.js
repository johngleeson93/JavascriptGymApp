"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store");
const uuid = require("uuid");
const memberAssessments = require("../models/assessment-store");
const accounts = require("./accounts.js");

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug("assessment id = ", assessmentId);
    const viewData = {
      title: "assessment",
      assessments: assessment.getassessment(assessmentId)
    };
    response.render("assessment", viewData);
  },

  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    const assessment = request.params.assessmentid;
    logger.debug(
      `Deleting assessment {{assessmentId}} from assessment {{assessmentId}}`
    );
    assessmentStore.removeAssessment(assessment, assessmentId);
    response.redirect("/assessment/" + assessmentId);
  },

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newAssessment = {
      id: uuid.v1(),
      memberId: loggedInMember.id,
      dateAndTime: new Date().toUTCString(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips)
    };
    logger.debug("Adding a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  }
};
module.exports = assessment;
