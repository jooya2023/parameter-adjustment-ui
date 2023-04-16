"use client";

import moment from "moment-jalaali";

export function useGetFormatDateMinusMins(
  durationInMinutes: number,
  format = "jYYYY/jM/jD HH:mm:ss.SSS"
) {
  const now = moment();
  const changedNow = now.clone().subtract(durationInMinutes, "minute");
  const stringChangedNow = changedNow.format(format);
  return stringChangedNow;
}
