"use server";

import { redirect } from "next/navigation";

export async function goToStartScreen() {
  return redirect("/");
}
