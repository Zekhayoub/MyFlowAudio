"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UpdateUserSchema, validateData } from "@/lib/validations";
import type { ValidationResult } from "@/lib/validations";

export async function updateUserName(formData: FormData): Promise<ValidationResult<void>> {
  const rawData = {
    full_name: formData.get("full_name"),
    user_id: formData.get("user_id"),
  };

  const validation = validateData(UpdateUserSchema, rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  const { full_name, user_id } = validation.data!;

  try {
    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase
      .from("users")
      .update({ full_name })
      .eq("id", user_id);

    if (error) {
      return {
        success: false,
        errors: { general: [error.message] }
      };
    }

    redirect("/account/edit?success=1");
  } catch (error) {
    return {
      success: false,
      errors: { general: ["Failed to update user name"] }
    };
  }
}