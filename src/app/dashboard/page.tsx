import React from "react";
import { getAnalyticsData } from "@/services/analytics";
import AnalyticsBoard from "@/components/dashboard/analytics/analyticsBoard";

const AnalyticsPage = async () => {
  const analyticsData = await getAnalyticsData();
  // console.log("analyticsData", analyticsData);
  return (
    <AnalyticsBoard analyticsData={analyticsData} />
  );
};
export default AnalyticsPage;
