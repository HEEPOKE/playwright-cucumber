import * as fs from "fs-extra";

async function createAndEmptyDirectory() {
  try {
    await fs.ensureDir("results");
    await fs.emptyDir("results");
    console.log("Successfully created and emptied the directory.");
  } catch (error) {
    console.error("Error creating or emptying the directory: " + error);
  }
}

createAndEmptyDirectory();
