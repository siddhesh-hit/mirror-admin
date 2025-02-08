import { paths } from "services/paths";

export const removeTailingId = (path = "") => path.replace("/:id", "");

export const portalPaths = [
  {
    name: "Biological Information",
    path: paths.viewAllBiologicalInformation,
    child: [paths.viewAllBiologicalInformation, paths.addBiologicalInformation, removeTailingId(paths.editBiologicalInformation), removeTailingId(paths.viewBiologicalInformation)],
  },
  {
    name: "Faq",
    path: paths.viewAllFaq,
    child: [paths.viewAllFaq, paths.addFaq, removeTailingId(paths.editFaq), removeTailingId(paths.viewFaq)],
  },
  {
    name: "Gallery",
    path: paths.viewGallery,
    child: [paths.viewGallery, paths.addGallery, removeTailingId(paths.editGallery), paths.viewGallery, removeTailingId(paths.viewGalleryImage)],
  },
  {
    name: "Legislative Assembly",
    path: paths.viewAllLegislativeAssembly,
    child: [paths.viewAllLegislativeAssembly, paths.addLegislativeAssembly, removeTailingId(paths.editLegislativeAssembly), removeTailingId(paths.viewLegislativeAssembly)],
  },
  {
    name: "Legislative Council",
    path: paths.viewAllLegislativeCouncil,
    child: [paths.viewAllLegislativeCouncil, paths.addLegislativeCouncil, removeTailingId(paths.editLegislativeCouncil), removeTailingId(paths.viewLegislativeCouncil)],
  },
  {
    name: "Legislative Member",
    path: paths.viewAllLegislativeMember,
    child: [paths.viewAllLegislativeMember, paths.addLegislativeMember, removeTailingId(paths.editLegislativeMember), removeTailingId(paths.viewLegislativeMember), removeTailingId(paths.viewMemberProfile)],
  },
  {
    name: "Library",
    path: paths.viewAllLibrary,
    child: [paths.viewAllLibrary, paths.addLibrary, removeTailingId(paths.editLibrary), removeTailingId(paths.viewLibrary)],
  },
  {
    name: "Mantri Mandal",
    path: paths.viewAllMantriMandal,
    child: [paths.addMantriMandal, removeTailingId(paths.viewMantriMandal), removeTailingId(paths.editMantriMandal), paths.viewAllMantriMandal],
  },
  {
    name: "Rajyapal",
    path: paths.viewAllRajyapal,
    child: [paths.viewAllRajyapal, paths.addRajyapal, removeTailingId(paths.editRajyapal), removeTailingId(paths.viewRajyapal)],
  },
  {
    name: "Session Calendar",
    path: paths.viewAllSessionCalendar,
    child: [paths.viewAllSessionCalendar, paths.addSessionCalendar, removeTailingId(paths.editSessionCalendar), removeTailingId(paths.viewSessionCalendar)],
  },
  {
    name: "Vidhan Mandal",
    path: paths.viewAllVidhanMandal,
    child: [paths.viewAllVidhanMandal, paths.addVidhanMandal, removeTailingId(paths.editVidhanMandal), removeTailingId(paths.viewVidhanMandal)],
  },
];

export const masterPaths = [
  {
    name: "Assembly",
    path: paths.viewAssembly,
    child: [paths.viewAssembly, paths.addAssembly, removeTailingId(paths.editAssembly)],
  },
  {
    name: "Branch",
    path: paths.viewBranch,
    child: [paths.viewBranch, paths.addBranch, removeTailingId(paths.editBranch)],
  },
  {
    name: "Committee",
    path: paths.viewCommittee,
    child: [paths.viewCommittee, paths.addCommittee, removeTailingId(paths.editCommittee)],
  },
  {
    name: "Constituency",
    path: paths.viewConstituency,
    child: [paths.viewConstituency, paths.addConstituency, removeTailingId(paths.editConstituency)],
  },
  {
    name: "Constituency Types",
    path: paths.viewConstituencyType,
    child: [paths.viewConstituencyType, paths.addConstituencyType, removeTailingId(paths.editConstituencyType)],
  },
  {
    name: "Designation",
    path: paths.viewDesignation,
    child: [paths.viewDesignation, paths.addDesignation, removeTailingId(paths.editDesignation)],
  },
  {
    name: "District",
    path: paths.viewDistrict,
    child: [paths.viewDistrict, paths.addDistrict, removeTailingId(paths.editDistrict)],
  },
  {
    name: "Legislative Positions",
    path: paths.viewLegislativePosition,
    child: [paths.viewLegislativePosition, paths.addLegislativePosition, removeTailingId(paths.editLegislativePosition)],
  },
  {
    name: "Ministry",
    path: paths.viewMinistry,
    child: [paths.viewMinistry, paths.addMinistry, removeTailingId(paths.editMinistry)],
  },
  {
    name: "Navigation",
    path: paths.viewNavigation,
    child: [paths.viewNavigation, paths.addNavigation, removeTailingId(paths.editNavigation)],
  },
  {
    name: "Political Parties",
    path: paths.viewPoliticalParty,
    child: [paths.viewPoliticalParty, paths.addPoliticalParty, removeTailingId(paths.editPoliticalParty)],
  },
  {
    name: "Presiding Officer",
    path: paths.viewPresidingOfficer,
    child: [paths.addPresidingOfficer, paths.viewPresidingOfficer, removeTailingId(paths.editPresidingOfficer)],
  },
  {
    name: "SessionField",
    path: paths.viewSessionField,
    child: [paths.viewSessionField, paths.addSessionField, removeTailingId(paths.editSessionField)],
  },
  {
    name: "User Gender",
    path: paths.viewGender,
    child: [paths.viewGender, paths.addGender, removeTailingId(paths.editGender)],
  },
];

export const homePaths = [
  {
    name: "Portal User",
    path: paths.viewPortalUser,
    child: [paths.viewPortalUser, removeTailingId(paths.editPortalUser), paths.addPortalUser, removeTailingId(paths.blockPortalUser), removeTailingId(paths.blockPortalUser), removeTailingId(paths.uploadPortalUser)],
  },
  {
    name: "Portal Department",
    path: paths.viewPortalDepartment,
    child: [paths.viewPortalDepartment, paths.addPortalDepartment, removeTailingId(paths.editPortalDepartment)],
  },
  {
    name: "Portal Branch",
    path: paths.viewPortalBranch,
    child: [paths.viewPortalBranch, paths.addPortalBranch, removeTailingId(paths.editPortalBranch)],
  },
  {
    name: "User Management",
    path: "/UserRole",
    child: [paths.userRole, removeTailingId(paths.editRole)],
  },
  {
    name: "Task Management",
    path: paths.viewTask,
    child: [paths.viewTask, paths.addTask, removeTailingId(paths.editTask)],
  },
  {
    name: "ContactUs",
    path: paths.viewContact,
    child: [paths.viewContact, paths.addContact, removeTailingId(paths.editContact)],
  },
  {
    name: "AuditTrail",
    path: paths.viewAudit,
    child: [paths.viewAudit, paths.viewAllUserAudit, removeTailingId(paths.viewUserAudit)],
  },
  {
    name: "Workflow",
    path: paths.viewAllWorkflow,
    child: [paths.viewAllWorkflow, removeTailingId(paths.viewWorkflow), removeTailingId(paths.editWorkflow), paths.addWorkflow, paths.viewWorkflowHistory, paths.viewWorkflowVidhanMandal, paths.viewWorkflowMantriMandal, paths.viewWorkflowSessionCalendar, paths.viewWorkflowFaq, paths.viewWorkflowGallery, paths.viewWorkflowInterestRequest, paths.viewWorkflowLegislativeAssembly, paths.viewWorkflowLegislativeCouncil, paths.viewWorkflowLibrary, paths.viewWorkflowRajyapal, paths.viewWorkflowMemberProfile, paths.viewWorkflowGalleryImage, paths.viewWorkflowContactUs],
  },
  {
    name: "Archive",
    path: paths.viewArchive,
    child: [paths.viewArchive],
  },
  {
    name: "SEO",
    path: paths.viewSeo,
    child: [paths.viewSeo, paths.addSeo, removeTailingId(paths.editSeo)],
  },
  {
    name: "File Manager",
    path: paths.viewFileManager,
    child: [paths.viewFileManager, paths.addFileManager, removeTailingId(paths.editFileManager)],
  },
  {
    name: "InterestRequest",
    path: paths.viewInterestRequest,
    child: [paths.viewInterestRequest, removeTailingId(paths.viewRequest), removeTailingId(paths.viewInterest), removeTailingId(paths.editRequest), removeTailingId(paths.editInterest)],
  },
  {
    name: "Feedback",
    path: paths.viewAllFeedback,
    child: [paths.viewAllFeedback, paths.viewFeedback, removeTailingId(paths.editFeedback)],
  },
  {
    name: "Helpdesk",
    path: paths.viewAllHelpdesk,
    child: [paths.viewAllHelpdesk, paths.viewHelpdesk, removeTailingId(paths.editHelpdesk)],
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
  { path: "/", name: "HomePage" },
  { path: "/Register", name: "Register" },
  { path: "/Login", name: "Login" },
  { path: "/phone-login", name: "PhoneLogin" },
  { path: "/verify-otp", name: "VerifyOTP" },
  { path: "/resetPassword/", name: "ResetPassword" },
  { path: "/forgetpassword", name: "ForgetPassword" },
  { path: "/AboutUs", name: "AboutUs" },
  { path: "/Debate", name: "Debate" },
  { path: "/DebateDetails", name: "Debate-Details" },
  { path: "/Governer", name: "Governer" },
  { path: "/GovernerList", name: "Governer" },
  { path: "/SearchDetails", name: "Search" },
  { path: "/ContactUs", name: "ContactUs" },
  { path: "/Library", name: "Library" },
  { path: "/HelpDesk", name: "HelpDesk" },
  { path: "/members/", name: "MemberAssembly" },
  { path: "/mantri-parishad", name: "MantriParishad" },
  { path: "/all-links", name: "AllLink" },
  { path: "/Feedback", name: "Feedback" },
  { path: "/member-details/", name: "MemberAssembly" },
  { path: "/member-council", name: "MemberCouncil" },
  { path: "/member-council-details/", name: "MemberCouncil" },
  { path: "/gallery", name: "Gallery" },
  { path: "/LegislativeAssembly", name: "LegislativeAssembly" },
  { path: "/LegislativeCouncil", name: "LegislativeCouncil" },
  { path: "/Judgments", name: "Judgment" },
  { path: "/SessionCalender", name: "SessionCalender" },
  { path: "/Gazetteers", name: "Gazetteers" },
  { path: "/Publications", name: "Publication" },
  { path: "/Gazette", name: "Gazette" },
  { path: "/Electionresult", name: "ElectionResult" },
  { path: "/Budgetyear", name: "BudgetYear" },
  { path: "/LegislationsBills", name: "LegislationsBill" },
  { path: "/Faq", name: "Faq" },
  { path: "/UserProfile", name: "UserProfile" },
];
