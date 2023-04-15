"use client";

import { useEffect, useState } from "react";
import moment from "moment-jalaali";

export function FormatToPersianDate(
  date: string,
  format = "jYYYY/jM/jD HH:mm:ss.SSS"
) {
  const dateObject = new Date(date);
  const isoDate = dateObject.toISOString();
  const persianDate = moment(isoDate).format(format);

  return persianDate;
}
