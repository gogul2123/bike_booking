import { getFromLocalStorage } from "@/components/ui/encryption";

type RequestHeaders = {
  Authorization?: string;
  "Content-Type"?: string;
  "x-user-id"?: string;
};

function buildHeaders(headers: RequestHeaders): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).filter(([_, value]) => value !== undefined)
  ) as Record<string, string>;
}

export const apiHeader = () => {
  const token = getFromLocalStorage("token");
  const userId = getFromLocalStorage("userId");
  if (token) {
    return buildHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-user-id": userId,
    });
  } else {
    return null;
  }
};
