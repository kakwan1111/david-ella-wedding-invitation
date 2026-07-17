import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { storagePut } from "./storage";
import { uploadWeddingFile, getWeddingFilesByUserId, deleteWeddingFile } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // 檔案存儲相關程序
  files: router({
    // 上傳檔案
    upload: protectedProcedure
      .input(z.object({
        fileName: z.string().min(1),
        fileData: z.string(), // base64 encoded
        fileType: z.enum(["photo", "video", "document"]),
        mimeType: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // 解碼 base64
          const buffer = Buffer.from(input.fileData, "base64");
          const fileSizeBytes = buffer.length;

          // 上傳到 S3
          const { key, url } = await storagePut(
            `wedding-files/${ctx.user.id}/${input.fileName}`,
            buffer,
            input.mimeType || "application/octet-stream"
          );

          // 儲存到資料庫
          await uploadWeddingFile({
            userId: ctx.user.id,
            fileName: input.fileName,
            fileKey: key,
            fileUrl: url,
            fileType: input.fileType,
            mimeType: input.mimeType,
            fileSizeBytes,
          });

          return { success: true, url, key };
        } catch (error) {
          console.error("File upload failed:", error);
          throw error;
        }
      }),

    // 取得使用者的檔案列表
    list: protectedProcedure.query(async ({ ctx }) => {
      return getWeddingFilesByUserId(ctx.user.id);
    }),

    // 刪除檔案
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        // TODO: 驗證檔案所有者
        await deleteWeddingFile(input.fileId);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
