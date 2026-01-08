import z from "zod";

const rules = {
  password: {
    min: {
      count: 8,
      message: "Kata sandi setidaknya memiliki 8 karakter",
    },
  },
  username: {
    min: {
      count: 1,
      message:
        "Nama pengguna setidaknya memiliki 1 karakter dan tidak boleh kosong",
    },
    max: {
      count: 25,
      message: "Nama pengguna maksimal adalah 25 karakter",
    },
  },
  bio: {
    min: {
      count: 1,
      message:
        "Minimal karakter dalam bio adalah 1 atau kosongkan untuk profil tanpa bio",
    },
    max: {
      count: 150,
      message: "Maksimal karakter untuk bio adalah 150",
    },
  },
};

const signInSchema = z.object({
  email: z.email("Alamat email tidak valid"),
  password: z
    .string()
    .min(rules.password.min.count, rules.password.min.message),
});

const signUpSchema = signInSchema.extend({
  username: z
    .string()
    .min(rules.username.min.count, rules.username.min.message)
    .max(rules.username.max.count, rules.username.max.message),
});

const publicSchema = signUpSchema.omit({
  password: true,
});

const userSchema = publicSchema.extend({
  bio: z
    .string()
    .min(rules.bio.max.count, rules.bio.min.message)
    .max(rules.bio.max.count, rules.bio.max.message)
    .optional(),
  avatar: z.string().optional(),
});

export type User = z.infer<typeof userSchema> & { id: string };

export { signInSchema, signUpSchema, userSchema };
