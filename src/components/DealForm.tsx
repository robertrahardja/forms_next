"use client";
import { submitDeal } from "@/actions/formaction";
import { ActionResponse } from "@/types/formtypes";
import React, { useActionState } from "react";
const initialState: ActionResponse = {
  success: false,
  message: "",
};

export default function DealForm() {
  const [state, action, isPending] = useActionState(submitDeal, initialState);
  return (
    <form className="w-full" action={action}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={state.inputs?.name}
            required
            minLength={5}
            className="w-full p-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="link">
            Link (must start with https://)
          </label>
          <input
            type="url"
            name="link"
            id="link"
            className="w-full p-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            pattern="https://.*"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="couponCode"
          >
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            id="couponCode"
            className="w-full p-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="discount">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            min="0"
            max="100"
            defaultValue={10}
            className="w-full p-2 rounded-md border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {state?.errors?.discount && (
            <p id="zipCode-error" className="text-sm text-red-500">
              {state.errors.discount[0]}
            </p>
          )}
        </div>
        <button
          disabled={isPending}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isPending ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
