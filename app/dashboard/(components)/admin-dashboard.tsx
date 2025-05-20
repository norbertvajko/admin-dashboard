import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "../data.json";
import { CardMetric } from "@/types";

//TODO - fetch from be
const metrics: CardMetric[] = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    trend: "up",
    trendValue: "12.5%",
    description: "Trending up this month",
    subtext: "Visitors for the last 6 months"
  },
  {
    title: "Clients",
    value: "1,234",
    trend: "down",
    trendValue: "20%",
    description: "Down 20% this period",
    subtext: "Acquisition needs attention"
  },
  {
    title: "Active clients",
    value: "45,678",
    trend: "up",
    trendValue: "12.5%",
    description: "Strong user retention",
    subtext: "Engagement exceed targets"
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    trend: "up",
    trendValue: "4.5%",
    description: "Steady performance increase",
    subtext: "Meets growth projections"
  }
];

const AdminDashboard = () => {
  return (
    <>
      <SectionCards metrics={metrics} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
};

export default AdminDashboard;
