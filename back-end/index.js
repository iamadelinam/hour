const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const moment = require("moment");
const db = require("./db.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/registration", (req, res) => {
  const salt = bcrypt.genSaltSync(13);
  const hash = bcrypt.hashSync(req.body.password, salt);
  res.set("Access-Control-Allow-Origin", "*");

  db.addUser(req.body.name, req.body.mail, hash, salt)
    .then((user) => {
      const newToken = uuid.v4();
      db.setToken(user.id, newToken)
        .then(() => {
          res.json({
            token: newToken,
          });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.put("/login", (req, res) => {
  if (!req.body.mail || !req.body.password || req.body.mail === undefined) {
    return res
      .status(400)
      .json({ error: "Please provide username or password!" });
  }
  db.findUserByEmail(req.body.mail)
    .then((user) => {
      const hash = bcrypt.hashSync(req.body.password, user.salt);
      if (hash === user.hash) {
        // TODO create token and store it in the DB
        const newToken = uuid.v4();
        db.setToken(user.id, newToken).then(() => {
          res.json({
            token: newToken,
          });
        });
      } else {
        res.status(500).json({ error: "Wrong password" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const authorizationMiddleware = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).json();
  }

  db.findUserByToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.status(401).json({ error: error.message });
    });
};

app.get(
  "/categories/:categoryId/activities",
  authorizationMiddleware,
  (req, res) => {
    // console.log("Im definitely authorized", req.user);
    db.getMonthlyActivities(
      req.params.categoryId,
      req.user.id,
      req.query.time_stamp ? moment(req.query.time_stamp).toDate() : undefined
    )
      .then((data) => {
        const minDate = req.query.time_stamp
          ? moment(req.query.time_stamp).startOf("month")
          : moment(
              Math.min(...data.map((a) => a.time_stamp.getTime()))
            ).startOf("month");
        const maxDate = moment().endOf("month");

        console.log(minDate, maxDate);
        const enrichedData = [];
        const amountOfDaysBetweenDates = Math.ceil(
          moment.duration(maxDate.diff(minDate)).asDays()
        );

        for (let i = 0; i < amountOfDaysBetweenDates; i++) {
          const lookingForDate = moment(minDate).add(i, "day");
          const activitiesForGivenDate = data.filter((activity) => {
            return moment(activity.time_stamp)
              .subtract(1, "day")
              .isSame(lookingForDate, "date");
          });
          let totalAmountOfMinutes = 0;
          if (activitiesForGivenDate && activitiesForGivenDate.length > 0) {
            totalAmountOfMinutes = activitiesForGivenDate.reduce(
              (acc, currentActivity) => {
                return acc + currentActivity.act_minutes;
              },
              0
            );
          }

          enrichedData.push({
            time_stamp: lookingForDate.toDate(),
            act_minutes: totalAmountOfMinutes,
            category_id: req.params.categoryId,
            authorization_id: req.user.id,
          });
        }
        res.json(enrichedData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

app.post("/categories", authorizationMiddleware, (req, res) => {
  db.nameCategorie(req.body.title, req.user.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post(
  "/categories/:categoryId/activities",
  authorizationMiddleware,
  (req, res) => {
    db.postActivitie(
      req.params.categoryId,
      req.body.timeStamp,
      req.body.actMinutes,
      req.user.id
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

app.get("/categories", authorizationMiddleware, (req, res) => {
  db.getCategories(req.user.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/categories/:categoryId", authorizationMiddleware, (req, res) => {
  const categoryId = req.params.categoryId;
  db.getCategory(categoryId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.listen(3333, () => {
  console.log("🚀 This server is running on port 3333");
});
