const express = require('express')
const bodyParser = require('body-parser')
require("dotenv").config();
const app = express()

let PORT = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.use("/api/account", require("./Account/account.route"));
app.use("/api/user", require("./User/user.route"));


app.use("/api/section-progress", require("./SectionProgress/route"));
app.use("/api/activity-progress", require("./ActivityProgress/route"));
app.use("/api/section-status", require("./SectionStatus/route"));
app.use("/api/activity-data", require("./ActivityData/route"));
app.use("/api/section-data", require("./SectionData/route"));
app.use("/api/section-link", require("./SectionLink/route"));
app.use("/api/lesson", require("./Lesson/route"));
app.use("/api/part", require("./Part/route"));
app.use("/api/grade", require("./Grade/route"));
app.use("/api/chapter", require("./Chapter/route"));
app.use("/api/artifact", require("./Artifact/route"));
app.use("/api/collection", require("./Collection/route"));
app.use("/api/achievement", require("./Achievement/route"));
app.use("/api/achievement-criterion", require("./AchievementCriterion/route"));
app.use("/api/achievement-account", require("./AchievementAccount/route"));
app.use("/api/collection-artifact", require("./CollectionArtifact/route")); 
app.use("/api/account-achievement-criterion", require("./AccountAchievementCriterion/route")); 
app.use("/api/achievement-criterion-achievement", require("./AchievementCriterionAchievement/route")); 


//Error handling
app.use(function(err, req, res, next) {
  if (err.http) {
    res.status(err.http).send(err);
  } else {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})