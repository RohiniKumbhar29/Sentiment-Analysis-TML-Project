import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const WordFrequencyBar = ({ data }) => {
  const top10Words = Array.isArray(data)
    ? [...data].sort((a, b) => b.count - a.count).slice(0, 10)
    : [];

  return (
    <motion.div
      className="bg-[#1e1e2e] p-6 rounded-xl shadow-lg my-4 overflow-x-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold neon-navy">
        Top 10 Frequent Words
      </h2>

      <div style={{ minWidth: Math.max(top10Words.length * 100, 600) }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            layout="vertical"
            data={top10Words}
            margin={{ top: 10, right: 40, left: 100, bottom: 20 }}
          >
            <defs>
              <linearGradient id="wordFreqNavyBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            <XAxis type="number" tick={{ fill: "#aaa" }} />
            <YAxis
              type="category"
              dataKey="word"
              tick={{ fill: "#ddd", fontSize: 13 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2a2a3b",
                border: "none",
                color: "#fff"
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="count"
              fill="url(#wordFreqNavyBlue)"
              barSize={24}
              radius={[6, 6, 6, 6]}
              label={{
                fill: "#fff",
                position: "right",
                fontSize: 12
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WordFrequencyBar;
