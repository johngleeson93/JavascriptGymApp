"use strict";

const logger = require("../utils/logger");
const assessmentlistStore = require("../models/assessmentlist-store");

const assessment = {
  index(request, response) {
    const assessmentlistId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Editing Assessment ${assessmentId} from Assessment ${assessmentlistId}`);
    const viewData = {
      title: "Edit Assessment",
      assessmentlist: assessmentlistStore.getAssessmentlist(assessmentlistId),
      assessment: assessmentlistStore.getAssessment(assessmentlistId, assessmentId)
    };
    response.render("assessment", viewData);
  },

  update(request, response) {
    const assessmentlistId = request.params.assessmentlistid;
    const assessmentId = request.params.assessmentid;
    const assessment = assessmentlistStore.getAssessment(assessmentlistId, assessmentId)
    const newAssessment = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug(`Updating Assessment ${assessmentId} from Assessmentlist ${assessmentlistId}`);
    assessmentlistStore.updateAssessment(assessment, newAssessment);
    response.redirect("/assessmentlist/" + assessmentlistId);
  }
};

module.exports = assessment;
