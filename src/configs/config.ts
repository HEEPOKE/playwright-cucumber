import * as dotenv from "dotenv";
import ConfigEnvironment from "../interfaces/env_interface";

const environment = process.env.NODE_ENV || "local";
let envFilePath: string;

if (environment === "local") {
  envFilePath = ".env.local";
} else if (environment === "uat") {
  envFilePath = ".env.uat";
} else if (environment === "prod") {
  envFilePath = ".env.prod";
} else {
  throw new Error(`Unsupported environment: ${environment}`);
}

dotenv.config({ path: envFilePath });

const config: ConfigEnvironment = {
  BASE_URL: process.env.BASE_URL || "",
  BROWSER: process.env.BROWSER || "chrome",
  HEAD: process.env.HEAD || true,
};

export default config;
