import amin1 from "~/public/images/projects/amin/1.png";
import dorsa1 from "~/public/images/projects/dorsa.cloud/1.png";
import gcloud1 from "~/public/images/projects/gcloud/1.png";

export const experiencesData: Experience[] = [
  {
    id: "amin_systems",
    companyName: "Amin Integrated Circuit Nanosystems",
    summary:
      "Frontend Developer specializing in React-based web applications and dashboard development for nanosystems research center.",
    thumbnailUrl: amin1,
    url: "https://www.aminsys.com/",
    startDate: "2022",
    endDate: "2024",
    description: [
      "Developed and maintained the company's main website using Next.js 12",
      "Created responsive user interfaces for research project showcases",
      "Implemented modern web standards and optimized performance",
      "Collaborated with research teams to present complex technical information",
      "Ensured cross-browser compatibility and mobile responsiveness",
    ],
  },
  {
    id: "dorsa_cloud",
    companyName: "Dorsa Cloud Services",
    summary:
      "Senior Frontend Developer responsible for building cloud service dashboards and client-facing web applications.",
    thumbnailUrl: dorsa1,
    url: "https://dorsa.cloud/",
    startDate: "2020",
    endDate: "2022",
    description: [
      "Led frontend development of cloud service management dashboard",
      "Built customer portal using React, MUI, and RTK Query",
      "Migrated legacy applications from Next.js 12 to Next.js 15 App Router",
      "Implemented form handling with Formik and validation systems",
      "Developed real-time monitoring interfaces for cloud services",
      "Mentored junior developers and established coding standards",
    ],
  },
  {
    id: "gcloud_systems",
    companyName: "GCloud Systems",
    summary:
      "Frontend Developer focused on enterprise dashboard development and data visualization interfaces.",
    thumbnailUrl: gcloud1,
    url: "https://g.dctm.ir/",
    startDate: "2018",
    endDate: "2020",
    description: [
      "Developed complex data visualization dashboards using React and MUI",
      "Implemented state management with Redux Toolkit and RTK Query",
      "Created responsive layouts for various screen sizes and devices",
      "Built form handling systems with validation and error management",
      "Optimized application performance and loading times",
      "Collaborated with backend teams to integrate REST APIs",
    ],
  },
];
