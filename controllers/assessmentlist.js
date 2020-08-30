"use strict";

const logger = require("../utils/logger");
const assessmentlistStore = require("../models/assessmentlist-store");
const uuid = require("uuid");
const memberAssessmentlists = require("../models/assessmentlist-store");

const assessmentlist = {
  index(request, response) {
    const assessmentlistId = request.params.id;
    logger.debug("assessmentlist id = ", assessmentlistId);
    const viewData = {
      title: "assessmentlist",
      assessmentlist: assessmentlist.getassessmentlist(assessmentlistId)
    };
    response.render("assessmentlist", viewData);
  },

  deleteAssessmentlist(request, response) {
    const assessmentlistId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(
      `Deleting assessment ${assessmentId} from assessmentlist ${assessmentlistId}`
    );
    assessmentlistStore.removeAssessment(assessmentlistId, assessmentId);
    response.redirect("/assessmentlist/" + assessmentlistId);
  },

  addAssessment(request, response) {
    const assessmentlistId = request.params.id;
    const assessmentlist = assessmentlistStore.getAssessmentlist(
      assessmentlistId
    );
    const newAssessment = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug("New assessment = ", newAssessment);
    assessmentlistStore.addAssessment(assessmentlist, newAssessment);
    response.redirect("/assessmentlist/" + assessmentlistId);
  }
};

module.exports = assessmentlist;
