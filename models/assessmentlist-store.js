"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentlistStore = {
  store: new JsonStore("./models/assessmentlist-store.json", {
    assessmentlistStoreCollection: []
  }),
  collection: "assessmentlistStoreCollection",

  getAllAssessmentlists() {
    return this.store.findAll(this.collection);
  },

  getAssessmentlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberAssessmentlists(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  addAssessmentlist(assessmentlist) {
    this.store.add(this.collection, assessmentlist);
    this.store.save();
  },

  removeAssessmentlist(id) {
    const assessmentlist = this.getAssessmentlist(id);
    this.store.remove(this.collection, assessmentlist);
    this.store.save();
  },

  removeAllAssessmentlists() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addAssessment(id, assessment) {
    const assessmentlist = this.getAssessmentlists(id);
    assessmentlist.assessments.push(assessment);

    let duration = 0;
    for (let i = 0; i < assessmentlist.assessments.length; i++) {
      duration += assessmentlist.assessments[i].duration;
    }

    assessmentlist.duration = duration;
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const assessmentlist = this.getAssessmentlist(id);
    const assessments = assessmentlist.assessments;
    _.remove(assessments, { id: assessmentId });
    this.store.save();
  },

  getAssessment(id, assessmentId) {
    const assessmentlist = this.store.findOneBy(this.collection, { id: id });
    const assessment = assessmentlist.assessments.filter(
      assessment => assessment.id == assessmentId
    );
    return assessment[0];
  },

  updateAssessment(assessment, updatedAssessment) {
    assessment.title = updatedAssessment.title;
    assessment.artist = updatedAssessment.artist;
    assessment.duration = updatedAssessment.duration;
    this.store.save();
  }
};

module.exports = assessmentlistStore;
