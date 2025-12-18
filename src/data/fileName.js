import { paths } from "services/paths";
import { removeTailingId } from "./RouteStructure";

export const pageName = {
  Debate: "",
  Faq: removeTailingId(paths.viewFaq),
  MandalGallery: removeTailingId(paths.viewFaq),
  Library: removeTailingId(paths.viewGalleryImage),
  VidhanMandal: removeTailingId(paths.viewVidhanMandal),
  Member: removeTailingId(paths.viewMemberProfile),
  Minister: removeTailingId(paths.viewMantriMandal),
  VidhanParishad: removeTailingId(paths.viewLegislativeCouncil),
  RajyapalMember: removeTailingId(paths.viewRajyapal),
  VidhanSabha: removeTailingId(paths.viewLegislativeAssembly),
  SessionCalendar: removeTailingId(paths.viewSessionCalendar),
};

export const newPageName = {
  VidhanMandal: "workflow/vidhan-mandal",
  VidhanParishad: "workflow/legislative-council",
  VidhanSabha: "workflow/legislative-assembly",
  Member: "workflow/member",
  Library: "workflow/library",
  SessionCalendar: "workflow/session-calendar",
  RajyapalMember: "workflow/rajyapal",
  Faq: "workflow/faq",
  Minister: "workflow/mantri-mandal",
  MandalGallery: "workflow/gallery/image",
  Debate: "",
  ContactUs: "workflow/contact",
};
