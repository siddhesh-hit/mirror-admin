export const portalPaths = [
  {
    name: "VidhanMandal",
    path: "/ViewAllVidhanMandal",
    child: [
      "/ViewAllVidhanMandal",
      "/AddVidhanMandal",
      "/EditVidhanMandal",
      "/ViewVidhanMandal",
    ],
  },
  {
    name: "VidhanParishad",
    path: "/ViewAllLegislativeCouncil",
    child: [
      "/ViewAllLegislativeCouncil",
      "/AddLegislativeCouncil",
      "/EditLegislativeCouncil",
      "/ViewLegislativeCouncil",
    ],
  },
  {
    name: "VidhanSabha",
    path: "/ViewAllLegislativeAssembly",
    child: [
      "/ViewAllLegislativeAssembly",
      "/AddLegislativeAssembly",
      "/EditLegislativeAssembly",
      "/ViewLegislativeAssembly",
    ],
  },
  {
    name: "Legislative Member",
    path: "/ViewAllLegislativeMember",
    child: [
      "/ViewAllLegislativeMember",
      "/AddLegislativeMember",
      "/EditLegislativeMember",
      "/ViewLegislativeMember",
      "/Viewmemberprofile",
    ],
  },
  {
    name: "Library",
    path: "/ViewAllLibrary",
    child: ["/ViewAllLibrary", "/AddLibrary", "/EditLibrary", "/ViewLibrary"],
  },
  {
    name: "Biological Information",
    path: "/ViewAllBiologicalInformation",
    child: [
      "/ViewAllBiologicalInformation",
      "/AddBiologicalInformation",
      "/EditBiologicalInformation",
      "/ViewBiologicalInformation",
    ],
  },
  {
    name: "Session Calendar",
    path: "/ViewAllSessionCalendar",
    child: [
      "/ViewAllSessionCalendar",
      "/AddSessionCalendar",
      "/EditSessionCalendar",
      "/ViewCalendar",
    ],
  },
  {
    name: "Rajyapal",
    path: "/ViewAllRajyapal",
    child: [
      "/ViewAllRajyapal",
      "/AddRajyapal",
      "/EditRajyapal",
      "/ViewRajyapal",
    ],
  },
  {
    name: "Faq's",
    path: "/ViewAllFaq",
    child: ["/ViewAllFaq", "/AddFaq", "/EditFaq", "/ViewFaq"],
  },
  {
    name: "Gallery",
    path: "/ViewGallery",
    child: ["/ViewGallery", "/AddGallery", "/EditGallery", "/ViewGallery", "/ViewGalleryImage"],
  },
  {
    name: "MantriMandal",
    path: "/ViewAllMantriMandal",
    child: [
      "/AddMantriMandal",
      "/ViewMantriMandal",
      "/EditMantriMandal",
      "/ViewAllMantriMandal",
    ],
  },
];

export const masterPaths = [
  {
    name: "Assembly",
    path: "/ViewAssembly",
    child: ["/ViewAssembly", "/AddAssembly", "/EditAssembly"],
  },
  {
    name: "Political Parties",
    path: "/ViewPoliticalParty",
    child: [
      "/ViewPoliticalParty",
      "/AddPoliticalParty",
      "/EditPoliticalParty",
    ],
  },
  {
    name: "Constituency",
    path: "/ViewConstituency",
    child: ["/ViewConstituency", "/AddConstituency", "/EditConstituency"],
  },
  {
    name: "District",
    path: "/ViewDistrict",
    child: ["/ViewDistrict", "/AddDistrict", "/EditDistrict"],
  },
  {
    name: "User Gender",
    path: "/ViewGender",
    child: ["/ViewGender", "/AddGender", "/EditGender"],
  },
  {
    name: "Ministry",
    path: "/ViewMinistry",
    child: ["/ViewMinistry", "/AddMinistry", "/EditMinistry"],
  },
  {
    name: "Navigation",
    path: "/ViewNavigation",
    child: ["/ViewNavigation", "/AddNavigation", "/EditNavigation"],
  },
  {
    name: "Designation",
    path: "/ViewDesignation",
    child: ["/ViewDesignation", "/AddDesignation", "/EditDesignation"],
  },
  // {
  //   name: "Department",
  //   path: "/ViewDepartment",
  //   child: ["/ViewDepartment", "/AddDepartment", "/EditDepartment"],
  // },
  {
    name: "SessionField",
    path: "/ViewSessionField",
    child: ["/ViewSessionField", "/AddSessionField", "/EditSessionField"],
  },
  {
    name: "Legislative Positions",
    path: "/ViewLegislativePosition",
    child: [
      "/ViewLegislativePosition",
      "/AddLegislativePosition",
      "/EditLegislativePosition",
    ],
  },
  {
    name: "Presiding Officer",
    path: "/ViewPresidingOfficer",
    child: [
      "/AddPresidingOfficer",
      "/ViewPresidingOfficer",
      "/EditPresidingOfficer",
    ],
  },
  {
    name: "Constituency Types",
    path: "/ViewConstituencyType",
    child: [
      "/AddConstituencyType",
      "/ViewConstituencyType",
      "/EditConstituencyType",
    ],
  },
  {
    name: "Committee",
    path: "/ViewCommittee",
    child: ["/AddCommittee", "/ViewCommittee", "/EditCommittee"],
  },
  {
    name: "Branch",
    path: "/ViewBranch",
    child: ["/AddBranch", "/ViewBranch", "/EditBranch"],
  },
];

export const homePaths = [
  {
    name: "Portal User",
    path: "/ViewPortalUser",
    child: ["/ViewPortalUser", "/EditPortalUser", "/AddPortalUser", "/BlockUser", "/UserReset", "/UploadPortalUser"],
  },
  {
    name: "Portal Department",
    path: "/ViewPortalDepartment",
    child: ["/ViewPortalDepartment", "/AddPortalDepartment", "/EditPortalDepartment"],
  },
  {
    name: "Portal Branch",
    path: "/ViewPortalBranch",
    child: ["/ViewPortalBranch", "/AddPortalBranch", "/EditPortalBranch"],
  },
  {
    name: "User Management",
    path: "/UserRole",
    child: ["/UserRole", "/EditRole"],
  },
  {
    name: "Task Management",
    path: "/ViewTask",
    child: ["/ViewTask", "/AddTask", "/EditTask"],
  },
  {
    name: "ContactUs",
    path: "/ViewContact",
    child: ["/ViewContact", "/AddContact", "/EditContact"],
  },
  {
    name: "AuditTrail",
    path: "/ViewAudit",
    child: ["/ViewAudit", "/ViewAllUserAudit", "/ViewUserAudit"],
  },
  {
    name: "Workflow",
    path: "/ViewAllWorkflow",
    child: [
      "/ViewAllWorkflow",
      "/ViewWorkflow",
      "/EditWorkflow",
      "/AddWorkflow",
      "/ViewWorkflowHistory",
      "/ViewWorkflowVidhanMandal",
      "/ViewWorkflowMantriMandal",
      "/ViewWorkflowCalendar",
      "/ViewWorkflowFaqs",
      "/ViewWorkflowGallery",
      "/ViewWorkflowInterestRequest",
      "/ViewWorkflowLegislativeAssembly",
      "/ViewWorkflowLegislativeCouncil",
      "/ViewWorkflowLibrary",
      "/ViewWorkflowRajyapal",
      "/ViewWorkflowMemberProfile",
      "/ViewWorkflowGalleryImage",
      "/ViewWorkflowContactUs",
    ],
  },
  {
    name: "Archive",
    path: "/ViewArchive",
    child: ["/ViewArchive"],
  },
  {
    name: "SEO",
    path: "/Viewseo",
    child: ["/Viewseo", "/AddSEO", "/EditSEO"],
  },
  {
    name: "File Manager",
    path: "/ViewFileManager",
    child: ["/ViewFileManager", "/AddFileManager", "/EditFileManager"],
  },
  {
    name: "InterestRequest",
    path: "/ViewInterestRequest",
    child: [
      "/ViewInterestRequest",
      "/ViewRequest",
      "/ViewInterest",
      "/EditRequest",
      "/EditInterest",
    ],
  },
  {
    name: "Feedback",
    path: "/ViewAllFeedback",
    child: ["/ViewAllFeedback", "/ViewFeedback", "/EditFeedback"],
  },
  {
    name: "Helpdesk",
    path: "/ViewAllHelpdesk",
    child: ["/ViewAllHelpdesk", "/Viewhelpdesk", "/Edithelpdesk"],
  },
];

export const auth = [
  "Admin",
  "SuperAdmin",
  "Reviewer",
  "ContentCreator",
  "User",
];

export const routes = [
  "Login",
  "Dashboard",

  "Assembly",
  "Political Parties",
  "Constituency",
  "District",
  "Gender",
  "Navigation",
  "Ministry",
  "Designation",
  "Department",
  "Legislative Positions",
  "Presiding Officer",
  "SessionField",
  "Constituency Types",
  "Committee",
  "Branch",

  "VidhanMandal",
  "VidhanParishad",
  "VidhanSabha",
  "Session Calendar",
  "Legislative Member",
  "Biological Information",
  "Rajyapal",
  "Faqs",
  "Gallery",
  "MantriMandal",

  "Portal User",
  "Library",
  "InterestRequest",
  "Feedback",
  "Helpdesk",
  "User Management",
  "Task Management",
  "ContactUs",
  "AuditTrail",
  "Workflow",
  "Archive",
  "SEO",
  "File Manager",
  "Portal Department",
  "Portal Branch",
];

export const authDesc = [
  "SuperAdmin, he can do everything.",
  "ContentCreator, he can create and edit tasks.",
  "User, can visit and perform basic functionality.",
  "Reviewer, he can approve the tasks.",
  "Admin, has functionality similar to SA but with some exceptions.",
];

export const websiteName = [
  {
    path: "/",
    name: "HomePage",
  },
  {
    path: "/Register",
    name: "Register",
  },
  {
    path: "/Login",
    name: "Login",
  },
  {
    path: "/phone-login",
    name: "PhoneLogin",
  },
  {
    path: "/verify-otp",
    name: "VerifyOTP",
  },
  {
    path: "/resetPassword/",
    name: "ResetPassword",
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
  },
  {
    path: "/AboutUs",
    name: "AboutUs",
  },
  {
    path: "/Debate",
    name: "Debate",
  },
  {
    path: "/DebateDetails",
    name: "Debate-Details",
  },
  {
    path: "/Governer",
    name: "Governer",
  },
  {
    path: "/GovernerList",
    name: "Governer",
  },
  {
    path: "/SearchDetails",
    name: "Search",
  },
  {
    path: "/ContactUs",
    name: "ContactUs",
  },
  {
    path: "/Library",
    name: "Library",
  },
  {
    path: "/HelpDesk",
    name: "HelpDesk",
  },
  {
    path: "/members/",
    name: "MemberAssembly",
  },
  {
    path: "/mantri-parishad",
    name: "MantriParishad",
  },
  {
    path: "/all-links",
    name: "AllLink",
  },
  {
    path: "/Feedback",
    name: "Feedback",
  },
  {
    path: "/member-details/",
    name: "MemberAssembly",
  },
  {
    path: "/member-council",
    name: "MemberCouncil",
  },
  {
    path: "/member-council-details/",
    name: "MemberCouncil",
  },
  {
    path: "/gallery",
    name: "Gallery",
  },
  {
    path: "/LegislativeAssembly",
    name: "LegislativeAssembly",
  },
  {
    path: "/LegislativeCouncil",
    name: "LegislativeCouncil",
  },
  {
    path: "/Judgments",
    name: "Judgment",
  },
  {
    path: "/SessionCalender",
    name: "SessionCalender",
  },
  {
    path: "/Gazetteers",
    name: "Gazetteers",
  },
  {
    path: "/Publications",
    name: "Publication",
  },
  {
    path: "/Gazette",
    name: "Gazette",
  },
  {
    path: "/Electionresult",
    name: "ElectionResult",
  },
  {
    path: "/Budgetyear",
    name: "BudgetYear",
  },
  {
    path: "/LegislationsBills",
    name: "LegislationsBill",
  },
  {
    path: "/Faq",
    name: "Faq",
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
  },
];
