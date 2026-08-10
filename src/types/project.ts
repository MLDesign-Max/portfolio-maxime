export type ProjectType = "ux-ui" | "motion";

export type TagColor = "blue" | "purple" | "green" | "amber" | "gray";

export interface ProjectStep {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface ProjectTag {
  label: string;
  color: TagColor;
}

export interface ProjectMedia {
  type: "image" | "video" | "lottie";
  url: string;
  posterUrl?: string;
}

export interface ProjectData {
  id: string;
  type: ProjectType;
  title: string;
  client: string;
  role: string;
  sector: string;
  year: string;
  tags: ProjectTag[];
  thumbnailUrl: string;
  media: ProjectMedia;
  steps: ProjectStep[];
}
