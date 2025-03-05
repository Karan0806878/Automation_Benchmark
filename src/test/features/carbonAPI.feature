Feature: Verify API responses for Carbon

    @api
    Scenario: Verify success response when User Info API is called
        When the user logs in to generate the API token
        And the user makes a call to verify the existing user
        Then the existing user call response is success

    @api
    Scenario: Verify Health Status of the Services
        And the user makes the call to verify the Health
        Then the health response is success

    Scenario Outline: Verify carbon expenditure profile is retrieved successfully for a project
        And the user makes a call to get the carbon expenditure profile for project <id>
        Then the carbon profile is retrieved successfully
        Examples:
            | id    |
            | 28315 |

    Scenario Outline: Verify the available estimate revision for a project
        And the user makes a call to get the estimate revision for project <id>
        Then the estimate revision details are retrieved successfully
        Examples:
            | id    |
            | 28315 |

    Scenario Outline: Verify that Section aggregated Project details are retrieved
        And the project aggregate call is done for project <id>
        Then the project sections are retrieved successfully
        Examples:
            | id    |
            | 28315 |

    Scenario Outline: Verify that Item Resource Tree aggreegation is retrieved for a section in a project
        And the item resource tree aggregation is retrieved for project <id> and section <secId>
        Then the respurce details are retrieved successfully
        Examples:
            | id    | secId  |
            | 28315 | 316201 |

    @allProject
    Scenario: Verify success response for all project API
        And the user makes the call to verify the getAllProject API
        Then the projectAll response is success

    @getProjectById
    Scenario: Verify success response for getProjectById API
        And the user makes the call to verify the getProjectById API for id <id>
        Then the getProjectById response is success
        Examples:
        |   id  |
        | 25487 |

    @allProject/meta/all
    Scenario: Verify success response for all project meta API
        And the user makes the call to verify the getProjectMetaAll API
        Then the projectsMetaAll response is success

    @createRevision
    Scenario: Verify success response for creating a revision
        And the user makes the call to verify the createRevision API
        Then the createRevision response is success 

    @getRevision
    Scenario: Verify success response for fetching a revision
        And the user makes the call to verify the getRevision API for projectId <projectId>
        Then the getRevision response is success 
        Examples:
        |projectId|
        |  22302  |

    @IFTSpend
    Scenario: Verify success response when IFTSpend API is called
        And the user makes the call to verify the IFTSpend API for projectId <projectId>
        Then the IFTSpend response is success 
        Examples:
        |projectId|
        |  25586  | 

    @IFTInflation
    Scenario: Verify success response when IFTInflation API is called
        And the user makes the call to verify the IFTInflation API for projectId <projectId>
        Then the IFTInflation response is success
        Examples:
        |projectId|
        |  27687  |  
  
    @IFTResult
    Scenario: Verify success response when IFTResult API is called
        And the user makes the call to verify the IFTResult API for projectId <projectId>
        Then the IFTResult response is success 
        Examples:
        |projectId|
        |  29150  |  

    @getRoles
    Scenario: Verify success response when getRoles API is called
        And the user makes the call to verify the getRoles API
        Then the getRoles response is success

    @getAccessList
    Scenario: Verify success response when getAccessList API is called
        And the user makes the call to verify the getAccessList API
        Then the getAccessList response is success

    @getAccessLevel
    Scenario: Verify success response when getAccessLevel API is called
        And the user makes the call to verify the getAccessLevel API
        Then the getAccessLevel response is success

    @getRoleAccess
    Scenario: Verify success response when getRoleAccess API is called
        And the user makes the call to verify the getRoleAccess API for <id>
        Then the getRoleAccess response is success
        Examples:
            | id  |
            |  1  |

    @createRoleAccess
    Scenario: Verify success response when createRoleAccess API is called
        And the user makes the call to verify the createRoleAccess API
        Then the createRoleAccess response is success

    @scheduleUpdate
    Scenario: Verify success response when scheduleUpdate API is called
        And the user makes the call to verify the scheduleUpdate API
        Then the scheduleUpdate response is success

    @getSchedule
    Scenario: Verify success response when getSchedule API is called
        And the user makes the call to verify the getSchedule API for parameter <params>
        Then the getSchedule response is success
        Examples:
        | params |
        |  fields=SCHEDULE_ID  |
        | filter=SCHEDULE_IDor$eqor65 |
        | sort=SCHEDULE_ID,ASC |
        | limit=10 |

    @getResourceLibraryForSpecificGroup
    Scenario: Verify success response when getResourceLibraryForSpecificGroup API is called
        And the user makes the call to verify the getResourceLibraryForSpecificGroup API for Resource_Group_id <id>
        Then the getResourceLibraryForSpecificGroup response is success
        Examples:
        | id |
        | 66 |

    @resourceLibraryInsertBulk
    Scenario: Verify success response when resourceLibraryInsertBulk API is called
        And the user makes the call to verify the resourceLibraryInsertBulk API
        Then the resourceLibraryInsertBulk response is success

    @getResourceLibraryCarbon
    Scenario: Verify success response when getResourceLibraryCarbon API is called
        And the user makes the call to verify the getResourceLibraryCarbon API
        Then the getResourceLibraryCarbon response is success

    @getResourceLibrarySuppliers
    Scenario: Verify success response when getResourceLibrarySuppliers API is called
        And the user makes the call to verify the getResourceLibrarySuppliers API
        Then the getResourceLibrarySuppliers response is success

    @projectResourceBulkUpdate
    Scenario: Verify success response when projectResourceBulkUpdate API is called
        And the user makes the call to verify the projectResourceBulkUpdate API
        Then the projectResourceBulkUpdate response is success

    @getProjectResource
    Scenario: Verify success response when getProjectResource API is called
        And the user makes the call to verify the getProjectResource API for id <id>
        Then the getProjectResource response is success
        Examples:
        |    id    |
        | 36919905 |

    @projectResourceInsertBulk
    Scenario: Verify success response when projectResourceInsertBulk API is called
        And the user makes the call to verify the projectResourceInsertBulk API
        Then the projectResourceInsertBulk response is success

    @deleteProjectResourceInsertBulk
    Scenario: Verify success response when deleteProjectResourceInsertBulk API is called
        And the user makes the call to verify the deleteProjectResourceInsertBulk API for id <ids> and projectId <projectId>
        Then the deleteProjectResourceInsertBulk response is success
        Examples:
        |   ids   | projectId |
        | 3453859 |    4598   |

    @fetchProjectResource
    Scenario: Verify success response when fetchProjectResource API is called
        And the user makes the call to verify the fetchProjectResource API
        Then the fetchProjectResource response is success

    @fetchProjectItem
    Scenario: Verify success response when fetchProjectItem API is called
        And the user makes the call to verify the fetchProjectItem API
        Then the fetchProjectItem response is success

    @projectItemBulkUpdate
    Scenario: Verify success response when projectItemBulkUpdate API is called
        And the user makes the call to verify the projectItemBulkUpdate API
        Then the projectItemBulkUpdate response is success

    @projectItemBulkInsert
    Scenario: Verify success response when projectItemBulkInsert API is called
        And the user makes the call to verify the projectItemBulkInsert API
        Then the projectItemBulkInsert response is success

    @projectSubItemBulkInsert
    Scenario: Verify success response when projectSubItemBulkInsert API is called
        And the user makes the call to verify the projectSubItemBulkInsert API
        Then the projectSubItemBulkInsert response is success

    @getProjectItem
    Scenario: Verify success response when getProjectItem API is called
        And the user makes the call to verify the getProjectItem API for id <id>
        Then the getProjectItem response is success
        Examples:
        |   id   |
        | 133681 |

    @getSASReportProjectList
    Scenario: Verify success response when getSASReportProjectList API is called
        And the user makes the call to verify the getSASReportProjectList API
        Then the getSASReportProjectList response is success

    @getSASReportProjectById
    Scenario: Verify success response when getSASReportProjectById API is called
        And the user makes the call to verify the getSASReportProjectById API for id <id>
        Then the getSASReportProjectById response is success
        Examples:
        |  id   |
        | 25443 |

    @getSAS-CESSReportProjectDetails
    Scenario: Verify success response when getSASCESSReportProjectDetails API is called
        And the user makes the call to verify the getSASCESSReportProjectDetails API for id <id>
        Then the getSASCESSReportProjectDetails response is success
        Examples:
        |  id   |
        | 25443 |

    @getItemLibrary
    Scenario: Verify success response when getItemLibrary API is called
        And the user makes the call to verify the getItemLibrary API for parameter <params>
        Then the getItemLibrary response is success
        Examples:
        |  params  |
        | ITEM_GROUP_ID=32 |
        | IS_SUB_ITEM=N |

    @getItemLibraryCarbon
    Scenario: Verify success response when getItemLibraryCarbon API is called
        And the user makes the call to verify the getItemLibraryCarbon API 
        Then the getItemLibraryCarbon response is success

    @itemLibraryCarbonUpdate
    Scenario: Verify success response when itemLibraryCarbonUpdate API is called
        And the user makes the call to verify the itemLibraryCarbonUpdate API 
        Then the itemLibraryCarbonUpdate response is success

    @getJourneyLegs
    Scenario: Verify success response when getJourneyLegs API is called
        And the user makes the call to verify the getJourneyLegs API 
        Then the getJourneyLegs response is success

    @deleteMultipleJourneyLegs
    Scenario: Verify success response when deleteMultipleJourneyLegs API is called
        And the user makes the call to verify the deleteMultipleJourneyLegs API for id <id>
        Then the deleteMultipleJourneyLegs response is success
        Examples:
        | id |
        | 11 |

    @getCESSReport
    Scenario: Verify success response when getCESSReport API is called
        And the user makes the call to verify the getCESSReport API for parameter <params>
        Then the getCESSReport response is success
        Examples:
        | params |
        | filter=ESTIMATE_BES_IDor$eqor24431 |
        | filter=SECTION_NUMBERor$eqor24 |
        | fileds=ESTIMATE_BES_ID |
        | filter=CE_IDor$eqor147 |
        | limit=10 |

    @getCESSReportAgg
    Scenario: Verify success response when getCESSReportAgg API is called
        And the user makes the call to verify the getCESSReportAgg API for parameter <params>
        Then the getCESSReportAgg response is success
        Examples:
        | params |
        | filter=ESTIMATE_BES_IDor$eqor24431 |

    @getProjectAggr
    Scenario: Verify success response when getProjectAggr API is called
        And the user makes the call to verify the getProjectAggr API for id <id> and parameter <params>
        Then the getProjectAggr response is success
        Examples:
        | id | params | 
        | 27093 | aggregatedOn=SECTION |
        | 27093 | aggregatedOn=ITEM |
        | 27093 | aggregatedOn=ITEM_RESOURCE_TREE |
        # | 27093 | sectionId=310373 |

    @ProjectAggrIFTCOMPCostelement
    Scenario: Verify success response when ProjectAggrIFTCOMP API is called
        And the user makes the call to verify the ProjectAggrIFTCOMP API
        Then the ProjectAggrIFTCOMP response is success

    @createContractEstimateLibrary
    Scenario: Verify success response when createContractEstimateLibrary API is called
        And the user makes the call to verify the createContractEstimateLibrary API
        Then the createContractEstimateLibrary response is success

    @getResourceEpd
    Scenario: Verify success response when getResourceEpd API is called
        And the user makes the call to verify the getResourceEpd API for id <id>
        Then the getResourceEpd response is success
        Examples:
        | id |
        | 3 |  

    @createResourceEpd
    Scenario: Verify success response when createResourceEpd API is called
        And the user makes the call to verify the createResourceEpd API
        Then the createResourceEpd response is success

    @updateResourceEpd
    Scenario: Verify success response when updateResourceEpd API is called
        And the user makes the call to verify the updateResourceEpd API
        Then the updateResourceEpd response is success

    @projectAggrIFTCOMP
    Scenario: Verify success response when projectAggrIFTCOMP API is called
        And the user makes the call to verify the projectAggrIFTCOMP API
        Then the projectAggrIFTCOMP response is success

    @inflationSheetIndex
    Scenario: Verify success response when inflationSheetIndex API is called
        And the user makes the call to verify the inflationSheetIndex API
        Then the inflationSheetIndex response is success

    @getCodes
    Scenario: Verify success response when getCodes API is called
        And the user makes the call to verify the getCodes API
        Then the getCodes response is success  

    @getFuelUserCodes
    Scenario: Verify success response when getFuelUserCodes API is called
        And the user makes the call to verify the getFuelUserCodes API
        Then the getFuelUserCodes response is success  

    
    @getCodeTypeUnitAggr
    Scenario: Verify success response when getCodeTypeUnitAggr API is called
        And the user makes the call to verify the getCodeTypeUnitAggr API for parameter <param>
        Then the getCodeTypeUnitAggr response is success
        Examples:
        | param |
        | CUSTOM_LIST_IDor$eqor171 |  

    @getTransportAssumption
    Scenario: Verify success response when getTransportAssumption API is called
        And the user makes the call to verify the getTransportAssumption API
        Then the getTransportAssumption response is success

    @addJourneyLeg
    Scenario: Verify success response when addJourneyLeg API is called
        And the user makes the call to verify the addJourneyLeg API
        Then the addJourneyLeg response is success

    @deleteJourneyLeg
    Scenario: Verify success response when deleteJourneyLeg API is called
        And the user makes the call to verify the deleteJourneyLeg API for id <id>
        Then the deleteJourneyLeg response is success
        Examples:
        | id |
        | 22 |

    @getContractEstimateLibraryContent
    Scenario: Verify success response when getContractEstimateLibraryContent API is called
        And the user makes the call to verify the getContractEstimateLibraryContent API
        Then the getContractEstimateLibraryContent response is success

    @getContractEstimateLibraryContentAssured
    Scenario: Verify success response when getContractEstimateLibraryContentAssured API is called
        And the user makes the call to verify the getContractEstimateLibraryContentAssured API
        Then the getContractEstimateLibraryContentAssured response is success

    @getUsers
    Scenario: Verify success response when getUsers API is called
        And the user makes the call to verify the getUsers API
        Then the getUsers response is success

    @getUserById
    Scenario: Verify success response when getUserById API is called
        And the user makes the call to verify the getUserById API for id <id>
        Then the getUserById response is success
        Examples:
        | id |
        | 258 |

    @getRiskRegister
    Scenario: Verify success response when getRiskRegister API is called
        And the user makes the call to verify the getRiskRegister API for projectId <projectId>
        Then the getRiskRegister response is success
        Examples:
        | projectId |
        | 23584 |

    @getSupplierResource
    Scenario: Verify success response when getSupplierResource API is called
        And the user makes the call to verify the getSupplierResource API for libraryCode <libraryCode>
        Then the getSupplierResource response is success
        Examples:
        | libraryCode |
        | M17 |

    # @assignRevisionContract
    # Scenario: Verify success response when assignRevisionContract API is called
    #     When the user logs in to generate the API token
    #     And the user makes the call to verify the assignRevisionContract API
    #     Then the assignRevisionContract response is success
        
   

        