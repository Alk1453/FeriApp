export const technicalPrinciples = [
  "simplicity",
  "scalability",
  "reuse",
  "maintainability",
  "mobile performance",
  "security",
  "hyperlocal experience",
] as const;

export const featureReadinessQuestions = [
  "Does it favor proximity between people?",
  "Does it reduce technical friction?",
  "Can it scale to new regions?",
  "Does it respect privacy?",
  "Can it reuse existing components?",
  "Does it add community value?",
] as const;

export const providerAbstractionPolicy = {
  maps: "internal map service",
  payments: "internal payment service",
  socialSharing: "internal sharing service",
} as const;
