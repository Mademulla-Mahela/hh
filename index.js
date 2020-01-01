import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// Set your preferred commit date as an ISO 8601 string
// You can format the date string however you like using moment
const preferredDate = moment("2024-01-01T10:00:00").format();

// Define the file path for con.ph
const configFilePath = "./h.py";

// Optionally, write some data to con.ph
const data = {
  date: preferredDate,
};

jsonfile.writeFile(configFilePath, data, { spaces: 2 }, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    // Add and commit only the con.ph file with the preferred date
    simpleGit()
      .add([configFilePath])
      .commit(`Commit made on ${preferredDate}`, { '--date': preferredDate })
      .push((err) => {
        if (err) console.error("Push error:", err);
        else console.log("Push successful!");
      });
  }
});
