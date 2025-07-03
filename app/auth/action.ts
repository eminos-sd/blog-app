"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { db } from "@/app/index";
import { User } from "../db/schema";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("Error : ", error.message);

    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: user, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  if (user) {
    try {
      const signedUser = user.user;

      const newUser = await db
        .insert(User)
        .values({
          id: signedUser!.id,
          email: signedUser!.email,
          username: signedUser!.email!.split("@")[0],
        })
        .returning({
          id: User.id,
          email: User.email,
          username: User.username,
        });

      console.log("User added to the public users table:", newUser);
    } catch (insertError) {
      console.error("Error inserting user into the public table:", insertError);
      redirect("/error");
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}
