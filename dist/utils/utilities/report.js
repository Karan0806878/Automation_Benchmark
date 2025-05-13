"use strict";
const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "test-results",
    reportPath: "./test-results",
    reportName: "Automation report",
    pageTitle: "Sanity Test report",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chrome",
            version: "131",
        },
        device: "Local test machine",
        platform: {
            name: "Windows",
            version: "11 Pro",
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "VER10" },
        ],
    },
});
