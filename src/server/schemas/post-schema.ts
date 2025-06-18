import z from "zod/v4";

export const PostSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
});
export type PostSchemaType = z.infer<typeof PostSchema>;
