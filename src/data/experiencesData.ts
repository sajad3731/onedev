import sampleThumbnail from "~/public/images/company.png";
import {
  default as dorsaThumbnail,
  default as gcloudThumbnail,
} from "~/public/images/dorsa-cloud.svg";
import aminThumbnail from "~/public/images/nano-system.png";
import mobtakerThumbnail from "~/public/images/mobtaker.png";
import zaeimThumbnail from "~/public/images/zaeim.png";

export const experiencesData: Experience[] = [
  {
    id: "zaeim_electronics",
    companyNameKey: "Experiences.data.zaeim_electronics.companyName",
    summaryKey: "Experiences.data.zaeim_electronics.summary",
    thumbnailUrl: zaeimThumbnail,
    url: "",
    startDate: "2024",
    endDate: "Present",
    responsibilityKeys: [
      "Experiences.data.zaeim_electronics.responsibility.0",
      "Experiences.data.zaeim_electronics.responsibility.1",
      "Experiences.data.zaeim_electronics.responsibility.2",
      "Experiences.data.zaeim_electronics.responsibility.3",
      "Experiences.data.zaeim_electronics.responsibility.4",
    ],
  },
  {
    id: "dorsa_cloud",
    companyNameKey: "Experiences.data.dorsa_cloud.companyName",
    summaryKey: "Experiences.data.dorsa_cloud.summary",
    thumbnailUrl: dorsaThumbnail,
    url: "https://dorsa.cloud/",
    startDate: "2023",
    endDate: "2024",
    responsibilityKeys: [
      "Experiences.data.dorsa_cloud.responsibility.0",
      "Experiences.data.dorsa_cloud.responsibility.1",
      "Experiences.data.dorsa_cloud.responsibility.2",
      "Experiences.data.dorsa_cloud.responsibility.3",
      "Experiences.data.dorsa_cloud.responsibility.4",
      "Experiences.data.dorsa_cloud.responsibility.5",
    ],
  },
  {
    id: "amin_systems",
    companyNameKey: "Experiences.data.amin_systems.companyName",
    summaryKey: "Experiences.data.amin_systems.summary",
    thumbnailUrl: aminThumbnail,
    url: "https://www.aminsys.com/",
    startDate: "2022",
    endDate: "2023",
    responsibilityKeys: [
      "Experiences.data.amin_systems.responsibility.0",
      "Experiences.data.amin_systems.responsibility.1",
      "Experiences.data.amin_systems.responsibility.2",
      "Experiences.data.amin_systems.responsibility.3",
      "Experiences.data.amin_systems.responsibility.4",
    ],
  },
  {
    id: "freelance",
    companyNameKey: "Experiences.data.freelance.companyName",
    summaryKey: "Experiences.data.freelance.summary",
    thumbnailUrl: sampleThumbnail, // Replace with actual image when available
    url: "",
    startDate: "2020",
    endDate: "2022",
    responsibilityKeys: [
      "Experiences.data.freelance.responsibility.0",
      "Experiences.data.freelance.responsibility.1",
      "Experiences.data.freelance.responsibility.2",
      "Experiences.data.freelance.responsibility.3",
      "Experiences.data.freelance.responsibility.4",
    ],
  },
  {
    id: "gcloud_systems",
    companyNameKey: "Experiences.data.gcloud_systems.companyName",
    summaryKey: "Experiences.data.gcloud_systems.summary",
    thumbnailUrl: gcloudThumbnail,
    url: "https://g.dctm.ir/",
    startDate: "2019",
    endDate: "2020",
    responsibilityKeys: [
      "Experiences.data.gcloud_systems.responsibility.0",
      "Experiences.data.gcloud_systems.responsibility.1",
      "Experiences.data.gcloud_systems.responsibility.2",
      "Experiences.data.gcloud_systems.responsibility.3",
      "Experiences.data.gcloud_systems.responsibility.4",
      "Experiences.data.gcloud_systems.responsibility.5",
    ],
  },
  {
    id: "mobtaker_pars",
    companyNameKey: "Experiences.data.mobtaker_pars.companyName",
    summaryKey: "Experiences.data.mobtaker_pars.summary",
    thumbnailUrl: mobtakerThumbnail,
    url: "",
    startDate: "2018",
    endDate: "2019",
    responsibilityKeys: [
      "Experiences.data.mobtaker_pars.responsibility.0",
      "Experiences.data.mobtaker_pars.responsibility.1",
      "Experiences.data.mobtaker_pars.responsibility.2",
      "Experiences.data.mobtaker_pars.responsibility.3",
      "Experiences.data.mobtaker_pars.responsibility.4",
    ],
  },
];
