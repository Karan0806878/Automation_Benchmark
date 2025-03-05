import { When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { LandingPage } from '../../../utils/pages/landing.page'
import { EstimateBrowserPage } from '../../../utils/pages/estimateBrowser.page'
import { ManageRevisionPage } from "../../../utils/pages/manageRevision.page"
import * as data from '../../../utils/data/fixtures.data.json'
import { pageFixture } from "../../hooks/pageFixture"
import { expect } from "@playwright/test";
import { UserProfilePage } from "../../../utils/pages/userProfile.page"
import { EstimateSpecificLibraryPage } from "../../../utils/pages/estimateSpecificLibrary"
setDefaultTimeout(60 * 1000);


Then('the admin creates a revision and assigns to contractor', async function () {
  const landingPage = new LandingPage(pageFixture.page)
  const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)
  const manageRevisionPage = new ManageRevisionPage(pageFixture.page)

  await landingPage.selectEstimateBrowser()
  console.log("\nEstimate Browser selected")
  await estimateBrowserPage.searchEstimate(data.estimateDescription)
  console.log("\nEstimate Searched")
  await pageFixture.page.waitForTimeout(1000);
  await estimateBrowserPage.selectManageEstimate(data.estimateDescription)
  console.log("\nManage Revisions Opened")
  const rev =  await manageRevisionPage.addNewRevision()
  expect(rev).toEqual('New Revision added successfully.')
  console.log('\nNew Revision added successfully')
  await manageRevisionPage.addMoreRows()
  this.estimateNumber = await manageRevisionPage.getEstimateNumber()
  await pageFixture.page.waitForTimeout(1000);
  let contractor: string = process.env.CCFTCONTRACTORNAME ?? "Contractor"
  let success = await manageRevisionPage.assignEstimateToContractor(this.estimateNumber, contractor)
  expect(success).toEqual('Contractors updated successfully.')
  console.log(`\nRevision assigned to Contractor: ${contractor}`)
});

When('the admin logs out and contractor logs back in', async function () {
  const userProfilePage = new UserProfilePage(pageFixture.page)
  await userProfilePage.logOut()
});

When('the contractor opens the assigned estimate and creates a revision', async function () {
  const landingPage = new LandingPage(pageFixture.page)
  const estimateBrowserPage = new EstimateBrowserPage(pageFixture.page)
  const manageRevisionPage = new ManageRevisionPage(pageFixture.page)

  await landingPage.selectEstimateBrowser()
  console.log("\nEstimate Browser selected")
  await estimateBrowserPage.searchEstimateNo(this.estimateNumber)
  await estimateBrowserPage.selectManageEstimate(this.estimateNumber)
  await pageFixture.page.waitForTimeout(500)
  console.log(`\nAssigned Estimate: ${this.estimateNumber} Opened for Review`)

  const rev =  await manageRevisionPage.addNewRevision()
  expect(rev).toEqual('New Revision added successfully.')
  console.log('\nNew Contractor Revision added successfully')
});


When('the contractor opens the estimate specific library and adds a new library to estimate', async function () {
  const manageRevisionPage = new ManageRevisionPage(pageFixture.page)
  const estimateSpecificLibraryPage = new EstimateSpecificLibraryPage(pageFixture.page)

  const rev = await manageRevisionPage.getEstimateNumber()
  await manageRevisionPage.openContSpecificLib(rev ?? "noEstimateFound")
  console.log("\nontractor Specific Library Page Opened")
  await estimateSpecificLibraryPage.addNewLibrary()
  await estimateSpecificLibraryPage.applyLibrarytoEstimate()
  console.log("\nNew Library added to Contractors revision")
});