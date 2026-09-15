"use client";

import { apiFetch } from "@/lib/api";
import Counter from "../components/Counter";
import type { TestResponse } from "../types/api";
export default async function TaskPage() {
  const response = await apiFetch<TestResponse>(
    "http://localhost:2202/task/all",
  );

  return (
    <>
      <h1>{response.message}</h1>
      <p>{response.number}</p>

      <Counter />
    </>
  );
}
