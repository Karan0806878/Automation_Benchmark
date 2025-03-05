import { Locator, Page } from "@playwright/test";
import { CustomFunction } from "../utilities/customFunction";
import { pageFixture } from "../../src/hooks/pageFixture";

export class IFTComparator {
    private page: Page;
    private addRevision: Locator;
    private confirmYes: Locator;
    private revisionSuccess: Locator;
    private revisionRow: Locator;
    private addMoreRow: Locator;
    private estimateNumber: string;
    private manageRevision: Locator;
    private pageNavigator: Locator;
    private sortContractor: Locator;
    private assignContractor: Locator;
    private assignContractorSuccess: Locator;
    private closeAssignContractor: Locator;
    private openEstimateSpecificLib: Locator;
    private arrangeEstimates: Locator;
    private viewIFT: Locator;
    private schedule: Locator;
    private scope: Locator;
    private riskRegister: Locator;
    private inflationAndSpend: Locator;
    private calender: Locator;
    private savebtn: Locator;
    private carbonToggle: Locator;
    private baselineToggle: Locator;
    private menuIcon: Locator;
    private itemRow: string;
    private expandArrow: string;
    private selectSection: string;
    private nominate: Locator;
    private selectRevisionToNominate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addRevision = page.getByText("Add Revision", { exact: true });
        this.confirmYes = page.getByText("Add", { exact: true });
        this.addMoreRow = page.getByText("200", { exact: true });
        this.revisionSuccess = page.locator(".dx-toast-message");
        this.revisionRow = page.locator(
            ".dx-data-row.dx-row-lines.dx-column-lines"
        );
        this.estimateNumber = "CT@-";
        this.manageRevision = page.getByText("Manage Contractors", { exact: true });
        this.pageNavigator = page.locator(".dx-overlay-content .dx-page-sizes");
        this.sortContractor = page.getByText("Un-Assigned From", { exact: true });
        this.assignContractor = page.locator("[data-icon='circle-left']");
        this.assignContractorSuccess = page.locator(".dx-toast-success");
        this.closeAssignContractor = page.locator(".dx-closebutton");
        this.openEstimateSpecificLib = page.getByText("Apply Estimate-Specific Library", { exact: true });
        this.arrangeEstimates = page.locator("(//span[@class='dx-sort dx-sort-up'])[1]");
        this.viewIFT = page.getByText("View IFT", { exact: true });
        this.schedule = page.getByText("Schedule", { exact: true });
        this.scope = page.getByText("Scope", { exact: true });
        this.riskRegister = page.getByText("Risk Register", { exact: true });
        this.inflationAndSpend = page.getByText("Inflation And Spend", { exact: true });
        this.calender = page.locator("(//div[@class='dx-dropdowneditor-icon'])[5]");
        this.savebtn = page.locator("//i[@class='dx-icon dx-icon-save']");
        this.carbonToggle = page.locator("(//div[@class='dx-switch-handle'])[1]");
        this.baselineToggle = page.locator("(//div[@class='dx-switch-handle'])[2]");
        this.menuIcon = page.locator("//i[@class='dx-icon dx-icon-menu']");
        this.itemRow = '.dx-data-row.dx-row-lines.dx-column-lines';
        this.expandArrow = ".dx-treelist-icon-container";
        this.selectSection = "[role='gridcell'] >> text='{desc}'";
        this.nominate = page.getByText("NOMINATE PREFERRED REVISION");
        this.selectRevisionToNominate = page.locator("(//div[@class='dx-dropdowneditor-icon'])[4]");
    }

    async revisionAdjustment() {
        await this.schedule.click();
        await this.page.waitForTimeout(2000);
        // await this.page.locator("(//td[@role='gridcell'])[9]").click();
        // await this.calender.click();
        // await this.page.locator("(//span[contains(text(),'8')])[3]").click();
        // await this.savebtn.click();
        // await this.page.waitForTimeout(10000);
        await this.scope.click();
        await this.page.waitForTimeout(10000);
        // await this.carbonToggle.click();
        // await this.page.waitForTimeout(1000);
        // await this.baselineToggle.click();
        // await this.page.waitForTimeout(1000);
        // await this.riskRegister.click();
        // await this.page.waitForTimeout(10000);
        // await this.menuIcon.click();
        // await this.page.waitForTimeout(1000);
        // await this.page.locator("//i[@class='dx-icon dx-icon-add']").click();
        // await this.page.waitForTimeout(1000);
        // await this.page.locator("//i[@class='dx-icon dx-icon-revert']").click();
        // await this.page.waitForTimeout(1000);
        // await this.inflationAndSpend.click();
        // await this.page.waitForTimeout(5000);
        // await this.carbonToggle.click();
        // await this.page.waitForTimeout(5000);
    }

    async expandStage(desc: string) {
        const customFunction = new CustomFunction(pageFixture.page)
        const selectItemNew = this.selectSection
            .toString()
            .replace("{desc}", desc);
        customFunction.clickOnSibling(this.itemRow, selectItemNew, this.expandArrow, 0)
    }
    async expandCompositeTotal(desc: string) {
        const customFunction = new CustomFunction(pageFixture.page)
        const selectItemNew = this.selectSection
            .toString()
            .replace("{desc}", desc);
        customFunction.clickOnSibling(this.itemRow, selectItemNew, this.expandArrow, 0)
    }
    async expandNormalItem(desc: string) {
        const customFunction = new CustomFunction(pageFixture.page)
        const selectItemNew = this.selectSection
            .toString()
            .replace("{desc}", desc);
        customFunction.clickOnSibling1(this.itemRow, selectItemNew, this.expandArrow, 0)
    }
    async nominateRevision() {
        await this.nominate.click();
        await this.selectRevisionToNominate.click();
        await this.page.locator("(//div[contains(text(),'CT1-11.07')])[1]").click();
        await this.page.getByText("SAVE").click();
        await this.page.getByText("YES").click();
    }
}