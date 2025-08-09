import { useEffect, useState } from "react";
import { fetchDashboardData } from "./api";
import "./index.css";

import UploadForm from "./components/UploadForm";
import SentimentMeter from "./components/SentimentMeter";
import TrendChart from "./components/TrendChart";
import DepartmentStackedBar from "./components/DepartmentStackedBar";
import DepartmentAvgBar from "./components/DepartmentAvgBar";
import WordFrequencyBar from "./components/WordFrequencyBar";
import ExtremesCard from "./components/ExtremesCard";
import TotalCountBadge from "./components/TotalCountBadge";
import Landing from "./components/Landing";
import { HiOutlineChartBar } from "react-icons/hi";
import { motion } from "framer-motion";

function App() {
  const [data, setData] = useState(null);

  const refreshData = () => {
    fetchDashboardData()
      .then(setData)
      .catch((err) => {
        console.error("❌ Failed to fetch dashboard data:", err);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (!data) {
    return (
      <p className="text-white text-center mt-10 animate-pulse">
        Loading dashboard...
      </p>
    );
  }

  const allRecords = (data.records || []).filter(
    (r) => r?.id !== null && r?.id !== undefined
  );

  const totalFeedbacks = allRecords.length;

  const avgScore =
    totalFeedbacks > 0
      ? allRecords.reduce((sum, r) => sum + r.comp_percent, 0) / totalFeedbacks
      : 0;

  return (
    <>
      <Landing scrollTarget="dashboard" />
      <main
        id="dashboard"
        className="bg-[#0f0f1f] min-h-screen px-4 py-10 text-white"
      >
        <motion.div
          className="max-w-5xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center items-center gap-3 text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HiOutlineChartBar className="w-8 h-8 text-blue-400 animate-pulse drop-shadow" />
          
            <h1 className="text-4xl font-extrabold neon-navy">
              Employee Sentiment Dashboard
            </h1>

          </motion.div>

          <UploadForm onUploadSuccess={refreshData} />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <TotalCountBadge count={totalFeedbacks} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <SentimentMeter
              sentimentScore={avgScore}
              allRecords={allRecords}
            />
            <div className="flex flex-col gap-6">
              <ExtremesCard
                longest={data.longest_feedback}
                shortest={data.shortest_feedback}
              />
            </div>
          </div>

          <TrendChart
            data={data.weekly_trends}
            title=" Weekly Average Sentiment"
            xKey="week"
            yKey="weekly_avg_compound"
          />
          <TrendChart
            data={data.monthly_trends}
            title=" Monthly Average Sentiment"
            xKey="month"
            yKey="monthly_avg_compound"
          />

          <DepartmentStackedBar data={data.department_sentiment_counts} />
          <DepartmentAvgBar data={data.department_sentiment_avg} />
          <WordFrequencyBar data={data.word_frequencies} />
        </motion.div>
      </main>
    </>
  );
}

export default App;
