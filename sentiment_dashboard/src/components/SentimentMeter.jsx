import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import CountUp from "react-countup";

const SentimentMeter = ({ sentimentScore = 76, allRecords = [] }) => {
  const [selectedEmp, setSelectedEmp] = useState("overall");
  const [score, setScore] = useState(sentimentScore);

  useEffect(() => {
    if (selectedEmp === "overall") {
      setScore(sentimentScore);
    } else {
      const record = allRecords.find((r) => String(r?.id) === selectedEmp);
      setScore(record?.comp_percent ?? 0);
    }
  }, [selectedEmp, sentimentScore, allRecords]);

  const uniqueEmpIds = [
    ...new Set(
      allRecords
        .map((r) => r?.id)
        .filter((id) => id !== null && id !== undefined)
        .map((id) => String(id))
    ),
  ];

  // ✅ Set arc color based on score
  let fillColor = "#3b82f6"; // blue
  if (score < 0) fillColor = "#ef4444";      // red
  else if (score === 0) fillColor = "#facc15"; // yellow

  const data = [{ name: "Sentiment", uv: Math.abs(score), fill: fillColor }];

  return (
    <motion.div
      className="relative bg-gradient-to-br from-[#17172a] to-[#1e1e30] shadow-2xl rounded-2xl px-8 py-6 w-full max-w-xl text-white"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold neon-navy">Sentiment Meter</h2>

        <select
          className="bg-gray-900 border border-gray-600 text-white px-3 py-1.5 rounded-md hover:border-indigo-500 transition-all duration-300"
          value={selectedEmp}
          onChange={(e) => setSelectedEmp(e.target.value)}
        >
          <option value="overall">Overall</option>
          {uniqueEmpIds.map((id) => (
            <option key={id} value={id}>
              Id : {id}
            </option>
          ))}
        </select>
      </div>

      {/* Labels */}
      <div className="flex justify-between px-8 mb-2 text-sm font-semibold">
        <span className="text-red-400">Negative</span>
        <span className="text-yellow-400">Neutral</span>
        <span className="text-blue-400">Positive</span>
      </div>

      {/* Arc Chart */}
      <div className="relative w-full flex items-center justify-center pb-2">
        <RadialBarChart
          width={280}
          height={140}
          cx="50%"
          cy="100%"
          innerRadius="180%"
          outerRadius="200%"
          barSize={14}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "#2c2c40" }}
            clockWise
            dataKey="uv"
            cornerRadius={6}
            fill={fillColor}
          />
        </RadialBarChart>

        {/* Score in Center */}
        <div className="absolute bottom-0 text-center">
          <p className="text-xs text-gray-400">Sentiment Score</p>
          <h2 className="text-3xl font-bold text-white">
            <CountUp end={score} duration={1.5} decimals={1} />%
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default SentimentMeter;
