import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

const getGradientId = (key) => `gradient-${key}`;

const CustomBar = ({ x, y, width, height, fill }) => {
  return (
    <g>
      <defs>
        <linearGradient id={getGradientId(fill)} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill[0]} />
          <stop offset="100%" stopColor={fill[1]} />
        </linearGradient>
      </defs>
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${getGradientId(fill)})`}
        rx={4}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    </g>
  );
};

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ background: "linear-gradient(#00f5ff, #007cf0)" }}></div>
        <span className="text-white">Positive</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ background: "linear-gradient(#3f87f5, #3358d4)" }}></div>
        <span className="text-white">Neutral</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ background: "linear-gradient(#6b63ff, #3f3cd4)" }}></div>
        <span className="text-white">Negative</span>
      </div>
    </div>
  );
};

const DepartmentStackedBar = ({ data }) => {
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  const sentiments = ["positive", "neutral", "negative"];
  const gradients = {
    positive: ["#00f5ff", "#007cf0"],
    neutral: ["#3f87f5", "#3358d4"],
    negative: ["#6b63ff", "#3f3cd4"],
  };

  return (
    <motion.div
      className="bg-[#1f1f30] p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold neon-navy">
          Sentiment Count by Department
        </h2>
        <select
          value={selectedSentiment}
          onChange={(e) => setSelectedSentiment(e.target.value)}
          className="text-sm border border-gray-600 rounded-md px-3 py-1.5 bg-[#2a2a45] text-white"
        >
          <option value="all">All</option>
          {sentiments.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 30 }}
          barCategoryGap={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="department"
            tick={{ fill: "#ccc", fontWeight: "600" }}
          />
          <YAxis
            tick={{ fill: "#aaa" }}
            label={{
              value: "Count",
              angle: -90,
              position: "outsideLeft",
              offset: 10,
              fill: "#aaa",
              textAnchor: "middle",
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#2a2a45", border: "none", color: "#fff" }}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />

          {(selectedSentiment === "all" || selectedSentiment === "positive") && (
            <Bar
              dataKey="positive"
              stackId="a"
              shape={(props) => <CustomBar {...props} fill={gradients.positive} />}
            />
          )}
          {(selectedSentiment === "all" || selectedSentiment === "neutral") && (
            <Bar
              dataKey="neutral"
              stackId="a"
              shape={(props) => <CustomBar {...props} fill={gradients.neutral} />}
            />
          )}
          {(selectedSentiment === "all" || selectedSentiment === "negative") && (
            <Bar
              dataKey="negative"
              stackId="a"
              shape={(props) => <CustomBar {...props} fill={gradients.negative} />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      {/* Legend at the bottom */}
      {selectedSentiment === "all" && <CustomLegend />}
    </motion.div>
  );
};

export default DepartmentStackedBar;
