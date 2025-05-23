declare interface Experience {
  id: string;
  companyNameKey: string; // Translation key for company name
  summaryKey: string; // Translation key for summary
  thumbnailUrl: StaticImageData;
  url?: string;
  startDate?: string;
  endDate?: string;
  responsibilityKeys: string[]; // Array of translation keys for descriptions
  descriptionKey?: string[];
}
