import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

// Format: YYYY-MM
const getMonthYear = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

// Format: Week 1, Week 2, etc.
const getWeekLabel = (dateStr) => {
  const d = new Date(dateStr);
  const start = new Date(d.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
  return `Week ${weekNumber}`;
};

// Format: Jan, Feb, etc.
const getMonthLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString("default", { month: "short" });
};

const TrendChart = ({ data = [], title, xKey, yKey }) => {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const allMonths = [...new Set(data.map((d) => getMonthYear(d[xKey])))].sort();

  const filteredData =
    selectedMonth === "all"
      ? data
      : data.filter((d) => getMonthYear(d[xKey]) === selectedMonth);

  const chartData = filteredData.length > 0 ? filteredData : [];

  const labelFormatter = title.toLowerCase().includes("week")
    ? getWeekLabel
    : getMonthLabel;

  return (
    <motion.div
      className="bg-white dark:bg-[#1f1f30] rounded-xl p-5 shadow-md overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-semibold neon-navy">
            {title}
          </h3>
        </div>

        <select
          className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="all">All</option>
          {allMonths.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto pb-2">
        <div
          style={{
            width: Math.max(chartData.length * 90, 600) + 80,
            minHeight: "300px",
            paddingRight: "40px",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 40, left: 80, bottom: 10 }} // <-- Left margin fixed
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xKey}
                interval={0}
                tickFormatter={labelFormatter}
                tick={{ fill: "#ccc" }}
              />
              <YAxis
                tick={{ fill: "#ccc" }}
                domain={["auto", "auto"]}
                label={{
                  value: "Compound Score",
                  angle: -90,
                  position: "insideLeft",     // Keeps it visible and tidy
                  offset: -5,                //  Pushes it away from tick marks
                  dy: 70,                    //  Moves label down toward center
                  fill: "#aaa",
                  fontSize: 18,
                  textAnchor: "middle",
                }}
              />

              <Tooltip labelFormatter={(val) => new Date(val).toDateString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendChart;

