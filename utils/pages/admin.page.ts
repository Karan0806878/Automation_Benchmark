import { Locator, Page } from "@playwright/test";
import { CustomFunction } from "../utilities/customFunction";
import { pageFixture } from "../../src/hooks/pageFixture";

export class AdminPage {
    private page: Page
    private controlPanel: Locator;
    private assignInflationIndex: Locator;
    private masterData: Locator;
    private codes: Locator;
    private modeOfTransport: Locator;
    private sourceReference: Locator;
    private transportCategory: Locator;
    private wrapCategory: Locator;
    private baselineAssumption: Locator;
    private transport: Locator;
    private transportAssumption: Locator;
    private BAmodeOfTransport: Locator;
    private emissionFactors: Locator;
    private baseCarbonLibrary: Locator;
    private dynamicCarbonLibrary: Locator;
    private roleBasedAccess: Locator;
    private assignEstimatorsToRoles: Locator;
    private roleBy: string;
    private roleParent: string;
    private roleDropdown: string;
    private rolePermissions: Locator;
    private inflationIndex: Locator;
    private addIcon: Locator;
    private undoIcon: Locator;
    private editIcon: Locator;
    private exportIcon: Locator;
    private search: Locator;
    private A1A3: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.controlPanel = page.getByText("Control Panel", { exact: true });
        this.assignInflationIndex = page.getByText("Assign Inflation Index", { exact: true });
        this.masterData = page.getByText("Master Data", { exact: true });
        this.codes = page.getByText("Codes", { exact: true });
        this.modeOfTransport = page.getByText("MODE OF TRANSPORTATION");
        this.sourceReference = page.getByText("SOURCE REFERENCE");
        this.transportCategory = page.getByText("TRANSPORT CATEGORY");
        this.wrapCategory = page.getByText("WRAP CATEGORY");
        this.baselineAssumption = page.getByText("Baseline Assumptions", { exact: true });
        this.transport = page.getByText("Transport", { exact: true });
        this.transportAssumption = page.getByText("Transport (Journey Leg) Assumptions", { exact: true });
        this.BAmodeOfTransport = page.getByText("Mode of Transport", { exact: true });
        this.emissionFactors = page.getByText("Emission Factors", { exact: true });
        this.baseCarbonLibrary = page.getByText("Base Carbon Library", { exact: true });
        this.dynamicCarbonLibrary = page.getByText("Dynamic Carbon Library", { exact: true });
        this.roleBasedAccess = page.getByText("Role Based Access", { exact: true });
        this.assignEstimatorsToRoles = page.getByText("Assign Estimators to Roles", { exact: true });
        this.roleBy = `//*[contains(text(), '{desc}')]`;
        this.roleParent = ".dropdown";
        this.roleDropdown = `input[role='combobox']`;
        this.rolePermissions = page.getByText("Role Permissions", { exact: true });
        this.inflationIndex = page.locator("//div[normalize-space()='Inflation Index']");
        this.addIcon = page.locator("//i[@class='dx-icon dx-icon-add']");
        this.undoIcon = page.locator("//i[@class='dx-icon dx-icon-undo']");
        this.editIcon = page.locator("//i[@class='dx-icon dx-icon-edit']");
        this.exportIcon = page.locator("//i[@class='dx-icon dx-icon-xlsxfile']");
        this.search = page.locator("//input[@aria-label='Search in the data grid']");
        this.A1A3 = page.locator("(//td[@class='border-class'])[1]");
    }

    async selectControlPanel() {
        await this.controlPanel.click();
    }

    async selectAssignInflationIndex() {
        await this.assignInflationIndex.click();
        const isTrue = await this.inflationIndex.isVisible();
        if (isTrue) {
            console.log("\nAssign Inflation Index Page Verified");
        } else {
            console.log("\nAssign Inflation Index Page not Verified");
        }
    }

    async selectMasterData() {
        await this.masterData.click();
    }

    async selectCodes() {
        await this.codes.click();
        await pageFixture.page.waitForTimeout(1500);
        await this.sourceReference.click();
        await pageFixture.page.waitForTimeout(1500);
        await this.transportCategory.click();
        await pageFixture.page.waitForTimeout(1500);
    }

    async selectBaselineAssumptions() {
        await this.baselineAssumption.click();
    }

    async selectTransport() {
        await this.transport.click();
        await pageFixture.page.waitForTimeout(1500);
        await this.transportAssumption.click();
        await pageFixture.page.waitForTimeout(1500);
        await this.addIcon.click();
        await pageFixture.page.waitForTimeout(1500);
        await this.undoIcon.click();
        await pageFixture.page.waitForTimeout(1500);
    }

    async selectModeOfTransport() {
        await this.BAmodeOfTransport.click();
        const isTrue = await this.editIcon.isVisible();
        if (isTrue) {
            console.log("\nMode of Transport Page Verified");
        } else {
            console.log("\nMode of Transport Page not Verified");
        }
    }

    async selectEmissionFactors() {
        await this.emissionFactors.click();
    }

    async selectBaseCarbonLibrary() {
        await this.baseCarbonLibrary.click();
        const isTrue = await this.exportIcon.isVisible();
        if (isTrue) {
            console.log("\nBase Carbon Library Page Verified");
        } else {
            console.log("\nBase Carbon Library Page not Verified");
        }
    }

    async selectDynamicCarbonLibrary() {
        await this.dynamicCarbonLibrary.click();
    }

    async verfiyDynamicCarbonLibrary() {
        const isTrue = await this.exportIcon.isVisible();
        if (isTrue) {
            console.log("\nDynamic Carbon Library Page Verified");
        } else {
            console.log("\nDynamic Carbon Library Page not Verified");
        }
    }

    async selectRoleBasedAccess() {
        await this.roleBasedAccess.click();
    }

    async selectAssignEstimatorsToRoles() {
        await this.assignEstimatorsToRoles.click();
    }

    async select(desc: string) {
        const customFunction = new CustomFunction(pageFixture.page);
        await this.page.waitForLoadState("load");
        const roleBy = this.roleBy
            .toString()
            .replace("{desc}", desc);
        customFunction.clickOnSibling(
            this.roleParent,
            roleBy,
            this.roleDropdown,
            0
        );
    }

    async selectRole(option: string) {
        await this.page.getByText(option, { exact: true }).click()
        await this.page.waitForLoadState("load");
        console.log(`\nSelect Role ${option} selected`);
    }

    async selectRolePermissions() {
        await this.rolePermissions.click();
    }

    async searchTab(desc: string) {
        await this.search.fill(desc);
    }

    async updateValues() {
        await this.A1A3.click();
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type("2");
        await this.page.locator("(//div[@role='presentation'][normalize-space()='Description'])[1]").click();
        await pageFixture.page.waitForTimeout(1500);
        await this.page.locator("(//td[@aria-describedby='dx-col-112'])[2]").click();
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type("2");
        await this.page.locator("(//div[@role='presentation'][normalize-space()='Description'])[1]").click();
        await pageFixture.page.waitForTimeout(1500);
        await this.page.locator("(//td[@aria-describedby='dx-col-132'])[2]").click();
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type("2");
        await this.page.locator("(//div[@role='presentation'][normalize-space()='Description'])[1]").click();

    }
}