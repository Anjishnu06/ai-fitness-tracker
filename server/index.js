// Required dependencies
const express = require("express");
const session = require("express-session");
const { google } = require("googleapis");
const path = require("path");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client, ID, Databases } = require("node-appwrite");
const {
  GoogleGenerativeAI,
  GenerativeModel,
} = require("@google/generative-ai");
const jwt = require("jsonwebtoken");
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Google OAuth2 credentials
const credentials = require("./creds.json");
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Appwrite setup
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY);
const database = new Databases(client);

const JWT_SECRET = process.env.JWT_SECRET || "anuragMishra"; // Secret key for signing JWT

const SCOPES = [
  "https://www.googleapis.com/auth/fitness.activity.read",
  "https://www.googleapis.com/auth/fitness.blood_glucose.read",
  "https://www.googleapis.com/auth/fitness.blood_pressure.read",
  "https://www.googleapis.com/auth/fitness.heart_rate.read",
  "https://www.googleapis.com/auth/fitness.body.read",
  "https://www.googleapis.com/auth/fitness.sleep.read",
  "https://www.googleapis.com/auth/fitness.reproductive_health.read",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual origin of your React app
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GenAI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Google OAuth2 authentication endpoint
app.get("/auth/google", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.json({ authUrl });
});

// Google OAuth2 callback endpoint
app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const profile = await getUserProfile(oAuth2Client);

    // Generate JWT with user profile information
    const jwtPayload = {
      displayName: profile.displayName,
      profilePhotoUrl: profile.profilePhotoUrl,
      userID: profile.userID,
    };
    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "1h" });

    // Redirect user to frontend with JWT
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.redirect("/error");
  }
});

// Middleware to verify JWT and authenticate user
const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "No authorization header. Please log in first." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userProfile = decoded; // Attach user profile to the request object
    next();
  } catch (error) {
    console.error("Invalid JWT:", error);
    return res
      .status(401)
      .send({ error: "Invalid access token. Please log in again." });
  }
};

// Protected route to fetch fitness data
app.get("/fetch-data", ensureAuthenticated, async (req, res) => {
  try {
    const fitness = google.fitness({
      version: "v1",
      auth: oAuth2Client,
    });

    const { displayName, profilePhotoUrl, userID } = req.userProfile;

    const fourteenDaysInMillis = 14 * 24 * 60 * 60 * 1000;
    const startTimeMillis = Date.now() - fourteenDaysInMillis;
    const endTimeMillis = Date.now();

    const response = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          { dataTypeName: "com.google.step_count.delta" },
          { dataTypeName: "com.google.blood_glucose" },
          { dataTypeName: "com.google.blood_pressure" },
          { dataTypeName: "com.google.heart_rate.bpm" },
          { dataTypeName: "com.google.weight" },
          { dataTypeName: "com.google.height" },
          { dataTypeName: "com.google.sleep.segment" },
          { dataTypeName: "com.google.body.fat.percentage" },
          { dataTypeName: "com.google.menstruation" },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis,
        endTimeMillis,
      },
    });

    const fitnessData = response.data.bucket;
    const formattedData = [];

    fitnessData.map((data) => {
      const date = new Date(parseInt(data.startTimeMillis));
      const formattedDate = date.toDateString();

      const formattedEntry = {
        date: formattedDate,
        step_count: 0,
        glucose_level: 0,
        blood_pressure: [],
        heart_rate: 0,
        weight: 0,
        height_in_cms: 0,
        sleep_hours: 0,
        body_fat_in_percent: 0,
        menstrual_cycle_start: "",
      };

      const datasetMap = data.dataset;
      datasetMap.map((mydataset) => {
        const point = mydataset.point;
        if (point && point.length > 0) {
          const value = point[0].value;
          switch (mydataset.dataSourceId) {
            case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":
              formattedEntry.step_count = value[0]?.intVal || 0;
              break;
            case "derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated":
              let glucoseLevel = 0;
              if (mydataset.point[0]?.value) {
                const dataArray = mydataset.point[0]?.value;
                dataArray.map((data) => {
                  if (data.fpVal) {
                    glucoseLevel = data.fpVal * 10;
                  }
                });
              }
              formattedEntry.glucose_level = glucoseLevel;
              break;
            case "derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated":
              let finalData = [0, 0];
              if (mydataset.point[0]?.value) {
                const BParray = mydataset.point[0]?.value;
                if (BParray.length > 0) {
                  BParray.map((data) => {
                    if (data.fpVal) {
                      if (data.fpVal > 100) {
                        finalData[0] = data.fpVal;
                      } else if (data.fpVal < 100) {
                        finalData[1] = data.fpVal;
                      }
                    }
                  });
                }
              }
              formattedEntry.blood_pressure = finalData;
              break;
            case "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated":
              let heartData = 0;
              if (mydataset.point[0]?.value) {
                const heartArray = mydataset.point[0]?.value;
                heartArray.map((data) => {
                  if (data.fpVal) {
                    heartData = data.fpVal;
                  }
                });
              }
              formattedEntry.heart_rate = heartData;
              break;
            // Add more cases as needed for other data types
          }
        }
      });
      formattedData.push(formattedEntry);
    });

    console.log("Fitness data fetched successfully!");
    console.log(formattedData);
    res.send({
      userName: displayName,
      profilePhoto: profilePhotoUrl,
      userId: userID,
      formattedData,
    });
  } catch (error) {
    console.error("Error fetching fitness data:", error.message);
    res.redirect("/error");
  }
});

const transformJSON = (inputJsonStr) => {
  try {
    // Remove ``` and any text like 'json' after ```
    const cleanedStr = inputJsonStr.replace(/```(json)?\s*|\s*```/g, '').trim();

    // Parse the cleaned JSON string
    const data = JSON.parse(cleanedStr);

    // Convert the parsed JSON back into a formatted string
    const outputJsonStr = JSON.stringify(data, null, 2);

    return outputJsonStr;
  } catch (error) {
    console.error("Error decoding JSON:", error.message);
    return null;
  }
};


app.post("/ai-food-calculator", async (req, res) => {
  const foodData = req.body.foodName;
  const prompt = `
  Analyze the following food item and provide nutritional information strictly in JSON format:
  {
    "food": "${foodData}"
  }
  Response format strictly:
  {
    "Calories": <number>,
    "Carbs": <number>
  }
`;
  try {
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    let questionsData = transformJSON(result.response.text());
    console.log(questionsData);
    res.status(200).json(questionsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(8000, () => {
  console.log("Service listening at 8000");
});

// Helper function to get user profile data
async function getUserProfile(auth) {
  const service = google.people({ version: "v1", auth });
  const profile = await service.people.get({
    resourceName: "people/me",
    personFields: "names,photos,emailAddresses",
  });

  const displayName = profile.data.names[0].displayName;
  const url = profile.data.photos[0].url;
  let userID = profile.data.resourceName;
  userID = parseInt(userID.replace("people/", ""), 10);
  return {
    displayName,
    profilePhotoUrl: url,
    userID,
  };
}
