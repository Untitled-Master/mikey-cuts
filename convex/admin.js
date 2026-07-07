import { mutation } from "./_generated/server";
import { v } from "convex/values";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "mikey-salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const login = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();
    if (!admin) return { success: false };
    const hash = await hashPassword(args.password);
    if (admin.passwordHash !== hash) return { success: false };
    return { success: true, username: admin.username };
  },
});

const TABLES = [
  "shorts", "projects", "longFormProjects", "reviews",
  "channels", "faq", "mainVid", "connect"
];

export const updateDoc = mutation({
  args: { table: v.string(), id: v.string(), fields: v.any() },
  handler: async (ctx, args) => {
    if (!TABLES.includes(args.table)) throw new Error("Invalid table");
    await ctx.db.patch(args.id, args.fields);
    return { success: true };
  },
});

export const insertDoc = mutation({
  args: { table: v.string(), fields: v.any() },
  handler: async (ctx, args) => {
    if (!TABLES.includes(args.table)) throw new Error("Invalid table");
    await ctx.db.insert(args.table, args.fields);
    return { success: true };
  },
});

export const deleteDoc = mutation({
  args: { table: v.string(), id: v.string() },
  handler: async (ctx, args) => {
    if (!TABLES.includes(args.table)) throw new Error("Invalid table");
    await ctx.db.delete(args.id);
    return { success: true };
  },
});


