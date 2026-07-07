import { query } from "./_generated/server";

export const getShorts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("shorts").collect();
  },
});

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const getLongFormProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("longFormProjects").collect();
  },
});

export const getReviews = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").collect();
  },
});

export const getChannels = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("channels").collect();
  },
});

export const getFaq = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("faq").collect();
  },
});

export const getMainVid = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("mainVid").first();
  },
});

export const getConnect = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("connect").collect();
  },
});
