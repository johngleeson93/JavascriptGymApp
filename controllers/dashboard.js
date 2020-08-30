"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentlistStore = require("../models/assessmentlist-store.js");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");
const utility = require("./utility.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Member Dashboard",
      assessments: assessmentlistStore.getMemberAssessments(loggedInMember.id),
      member: memberStore.getMemberById(loggedInMember.id),
      bmi: gymutility.bmi(memberStore.getMemberById(loggedInMember.id), assessmentStore.getMemberAssessments[0])
    };
    logger.info("about to render ${memberid}");
    response.render("dashboard", viewData);
  },

  deleteAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
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
  },
  
  edit(request, response) {
    logger.debug("rendering edit member form");
    response.redirect("/editmember");
  },
  
  editMember(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId)
    const updatedMember = {
      name: request.body.name,
      email: request.body.email,
      address: request.body.address,
      gender: request.body.gender
    };
    logger.debug(`Updating ${member}`);
    memberStore.editMember(member, updatedMember);
    response.redirect("/dashboard");
    
  }
};

module.exports = dashboard;
