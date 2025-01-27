const cds = require("@sap/cds");
const { Tests } = cds.entities("quiz");

const logger = cds.log("QUIZ TEST : ");

module.exports = cds.service.impl(function () {
  const { Tests, Questions } = this.entities;

  this.before("DELETE", Tests, async (req) => {
    const id = req.params[0];

    const test = await SELECT.one.from(Tests).where({ ID: id });
    if (!test) {
      req.error(404, `Test not found.`);
    }

    await UPDATE(Questions).set({ test_ID: null }).where({ test_ID: id });
  });

  this.on("setquestionsCount", Tests, async (req) => {
    const id = req.params[0]; // Test ID
    const { questionsCount } = req.data;

    const test = await SELECT.one.from(Tests).where({ ID: id });
    if (!test) {
      req.error(404, `Test Not Found`);
    }

    if (questionsCount < 1) {
      req.error(400, `questionsCount must be 1 or greater.`);
    }

    const unassignedQuestions = await SELECT.from(Questions)
      .where({ test_ID: null })
      .limit(questionsCount);

    if (unassignedQuestions.length < questionsCount) {
      req.error(400, `Shortage of free questions`);
    }

    await UPDATE(Questions)
      .set({ test_ID: id })
      .where({ ID: unassignedQuestions.map((q) => q.ID) });

    test.questionsCount = questionsCount;

    return test;
  });
});
