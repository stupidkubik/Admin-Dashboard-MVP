import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "editor", "viewer"]);

const editableUserFields = {
  name: z.string().trim().min(2).max(50),
  email: z.email().max(100),
  role: userRoleSchema,
  active: z.boolean(),
};

export const userResponseSchema = z
  .object({
    id: z.string().min(1),
    ...editableUserFields,
    createdAt: z.iso.datetime(),
  })
  .strict();

export const usersResponseSchema = z.array(userResponseSchema);

export const apiSuccessSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({ data: dataSchema }).strict();

export const userApiResponseSchema = apiSuccessSchema(userResponseSchema);
export const usersApiResponseSchema = apiSuccessSchema(usersResponseSchema);
export const userMutationApiResponseSchema = apiSuccessSchema(
  z.object({ user: userResponseSchema }).strict(),
);
export const createUserRequestSchema = z.object(editableUserFields).strict();
export const updateUserRequestSchema = z
  .object(editableUserFields)
  .partial()
  .strict()
  .refine((values) => Object.keys(values).length > 0, {
    message: "At least one user field is required",
  });

export const authRequestSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1),
  })
  .strict();

const localizedStringMapSchema = z
  .object({
    en: z.string().optional(),
    es: z.string().optional(),
    fr: z.string().optional(),
    ru: z.string().optional(),
  })
  .strict();

const seriesPointSchema = z
  .object({
    date: z.iso.date(),
    value: z.number(),
    label: z.string().optional(),
    labels: localizedStringMapSchema.optional(),
  })
  .strict();

const chartDataPointSchema = z
  .object({
    label: z.string(),
    labels: localizedStringMapSchema.optional(),
    value: z.number(),
  })
  .strict();

const activityTranslationSchema = z
  .object({
    title: z.string(),
    details: z.string().optional(),
  })
  .strict();

const activityItemSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    typeLabel: z.string().optional(),
    typeLabels: localizedStringMapSchema.optional(),
    title: z.string(),
    timestamp: z.iso.datetime(),
    details: z.string().optional(),
    translations: z
      .object({
        en: activityTranslationSchema.optional(),
        es: activityTranslationSchema.optional(),
        fr: activityTranslationSchema.optional(),
        ru: activityTranslationSchema.optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export const dashboardStatsResponseSchema = z
  .object({
    users: z.number(),
    revenue: z.number(),
    growthPct: z.number(),
    activeUsers: z.number(),
    totalOrders: z.number(),
    conversionRate: z.number(),
    avgSessionDuration: z.number(),
    customerSatisfaction: z.number(),
    series: z.array(seriesPointSchema),
    usersByType: z.array(chartDataPointSchema),
    revenueByRegion: z.array(chartDataPointSchema),
    performanceMetrics: z
      .object({
        pageLoadTime: z.number(),
        errorRate: z.number(),
        uptime: z.number(),
      })
      .strict(),
    recentActivity: z.array(activityItemSchema),
  })
  .strict();

export const dashboardStatsApiResponseSchema = apiSuccessSchema(
  dashboardStatsResponseSchema,
);

export const authResponseSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        email: z.email(),
      })
      .strict(),
    demo: z.boolean(),
  })
  .strict();

export const authApiResponseSchema = apiSuccessSchema(authResponseSchema);
export const emptyApiResponseSchema = apiSuccessSchema(z.object({}).strict());

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type AuthRequest = z.infer<typeof authRequestSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
