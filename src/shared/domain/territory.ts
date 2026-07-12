export type TerritoryLevel =
  | "country"
  | "province"
  | "department"
  | "locality"
  | "neighborhood";

export type PublicLocation = {
  neighborhood: string;
  locality: string;
  distanceLabel: string;
};

export type PrivateLocation = {
  latitude: number;
  longitude: number;
};

export const territoryLevels: TerritoryLevel[] = [
  "country",
  "province",
  "department",
  "locality",
  "neighborhood",
];

export const locationPrivacyPolicy = {
  privateLocationUse: ["distance", "matches", "search", "alerts"],
  publicLocationUse: ["approximate zone", "neighborhood", "estimated radius"],
  exposeExactLocationByDefault: false,
} as const;
