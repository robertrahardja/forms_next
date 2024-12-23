"use server";
import { z } from "zod";
import type { ActionResponse, DealFormData } from "../types/formtypes";

const dealSchema = z.object({
  name: z.string().min(1, "Deal name is required"),
  link: z.string().url("Please enter a valid URL"),
  couponCode: z.string().optional(),
  discount: z.number().min(20, "Discount must be a above 20"),
});

export async function submitDeal(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const rawData: DealFormData = {
      name: formData.get("name") as string,
      link: formData.get("link") as string,
      couponCode: formData.get("couponCode") as string | undefined,
      discount: Number(formData.get("discount")),
    };

    // Validate the form data
    const validatedData = dealSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the deal to your database
    console.log("Deal submitted:", validatedData.data);

    return {
      success: true,
      message: "Deal saved successfully!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An unexpected error occurred" + error,
    };
  }
}
