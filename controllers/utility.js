"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentlistStore = require("../models/assessmentlist-store.js");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");

const utility = {
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");
  bmi (member, assessment) {
    const bmi = assessment.weight() / ((member.height() / 100) * (member.height() / 100))
  },
  
  determineBMICategory(bmiValue) {
    if (bmiValue < 16) {
            return "SEVERELY UNDERWEIGHT";
        }
        if (bmiValue >= 16 && bmiValue < 18.5) {
            return "UNDERWEIGHT";
        }
        if (bmiValue >= 18.5 && bmiValue < 25.0) {
            return "NORMAL";
        }
        if (bmiValue >= 25.0 && bmiValue < 30.0) {
            return "OVERWEIGHT";
        }
        if (bmiValue >= 30.0 && bmiValue < 35.0) {
            return "MODERATELY OBESE";
        }
        if (bmiValue >= 35.0) {
            return "SEVERELY OBESE";
        }
        return null;
  }
};

module.exports = utility;