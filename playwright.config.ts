import { defineConfig } from "@playwright/test";
import { OrtoniReportConfig } from "ortoni-report";

const reportConfig: OrtoniReportConfig = {
  open: process.env.CI ? "never" : "always",
  folderPath: "report-db",
  filename: "index.html",
  title: "VER10 Automation Report",
  showProject: !true,
  projectName: "VER10",
  testType: "Sanity",
  authorName: "Vijay",
  base64Image: false,
  stdIO: false,
  preferredTheme: "light"
};

export default defineConfig({
  reporter: [["ortoni-report", reportConfig]],
  use: {
    screenshot: "on",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  }
  // Other Playwright configurations
});