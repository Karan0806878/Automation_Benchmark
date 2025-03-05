# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
This repository is used for Sanity & Regression Testing for the Benchmark CCFT Application. 

### Quick summary
[Playwright](https://playwright.dev/) is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.
Feature files are written in BDD style and uses cucumber - Gherkin as the language.
**TypeScript** is the coding language for all the steps and functions.

### Version
Playwright version 1.42.1 is being used as a base for the framework.
Other than that, the scripts run with the latest browser versions available in the local system.


### How do I get set up? ###
##### To setup the test Automation follow the below steps
* Download and Install Node.js
* Install VScode for script maintenance & creation
* Clone the repo in the local (command: git clone $cloneurl) and open the Project in Vscode. Repo link: https://github.com/BenchmarkGlobalPtyLtd/benchmark-test-automation.git
* Create a new git branch => git checkout -b new_branch_name
* Open terminal and run command for all the dependencies installation: **npm install**


### Configuration
* Basic configurations are handled from the file *cucumber.json*


### How to run tests
##### To Run using the CLI=> commands are defined in the *package.json* under *scripts* section. Mention script names needs to be preceeded with *npm test*
* e.g. To run all the feature files, the command should be *npm test*


### Directory Structure
* cucumber.json=> contains the basic configurations and timeouts utilised during the Test runs.
* package.json => contains the run commands as well as the package dependencies details.
* src/test/features/*.feature =>  All feature files are located here in BDD format
* utils/pages/*.page.ts => This important folder has details of the locators in POM style. Feature files refer this file for locators and corresponding actions
* utils/utility/customFunction.ts => This file has custom methods which supports the test run
* utils/data/fixtures.data => This file will have details of the test data to be used during test run
* utils/apiHelper/*.ts => All API calls details are stored here and can be called by passing the required parameters
* .gitignore => files or glob patterns mentioned here will not be committed and pushed to the bitbucket sourcecode.
* test-results/videos => This folder contains video for the test runs triggered
* test-results/cucumber-report.html => This is the test report generated. When opened in Chrome, it has details of last run
* .github/workflows/playwright.yml => This is the yml file which is used to trigger run in GitHub Actions. It is useful for Continuos Integration and Testing.


### Code review
* All the changes needs to be committed & pushed to the feature branch and then PR request needs to be created.
* Once the PR is approved, the changes can be merged to the main branch 
