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

const DepartmentAvgBar = ({ data }) => (
  <motion.div
    className="bg-[#1f1f30] p-6 rounded-xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    
    <h2 className="text-xl font-semibold neon-navy">
      Average Sentiment by Department
    </h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis type="number" tick={{ fill: "#aaa" }} />
        <YAxis dataKey="department" type="category" tick={{ fill: "#ccc", fontWeight: 600 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#2a2a45", border: "none", color: "#fff" }}
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
        />
        <Bar dataKey="compound" fill="url(#neonGradient)" radius={[6, 6, 6, 6]} />
        <defs>
          <linearGradient id="neonGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ffcc" />
            <stop offset="100%" stopColor="#007cf0" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
);

export default DepartmentAvgBar;
