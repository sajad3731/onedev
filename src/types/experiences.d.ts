declare interface Experience {
  id: string;
  companyNameKey: string; // Translation key for company name
  summaryKey: string; // Translation key for summary
  thumbnailUrl: StaticImageData;
  url?: string;
  startDate?: string;
  endDate?: string;
  descriptionKeys: string[]; // Array of translation keys for descriptions

  // Deprecated fields - keeping for backward compatibility during migration
  /** @deprecated Use companyNameKey instead */
  companyName?: string;
  /** @deprecated Use summaryKey instead */
  summary?: string;
  /** @deprecated Use descriptionKeys instead */
  description?: string[];
}
