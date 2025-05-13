"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const reportConfig = {
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
exports.default = (0, test_1.defineConfig)({
    reporter: [["ortoni-report", reportConfig]],
    use: {
        screenshot: "on",
        video: "retain-on-failure",
        trace: "retain-on-failure",
    }
    // Other Playwright configurations
});
