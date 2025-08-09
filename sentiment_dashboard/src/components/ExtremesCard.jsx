import { motion } from "framer-motion";
import { MessageSquareQuote, MessageCircle } from "lucide-react";

const ExtremesCard = ({ longest, shortest }) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div
      className="bg-gradient-to-br from-[#2e2e4d] to-[#1f1f2e] p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-indigo-700/40 transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageSquareQuote className="text-indigo-400 w-5 h-5" />
        <h3 className="text-base font-semibold text-white tracking-wide">
          Longest Feedback
        </h3>
      </div>
      <p className="italic text-gray-300 text-sm leading-relaxed">"{longest}"</p>
    </motion.div>

    <motion.div
      className="bg-gradient-to-br from-[#2e2e4d] to-[#1f1f2e] p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-indigo-700/40 transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="text-indigo-400 w-5 h-5" />
        <h3 className="text-base font-semibold text-white tracking-wide">
          Shortest Feedback
        </h3>
      </div>
      <p className="italic text-gray-300 text-sm leading-relaxed">"{shortest}"</p>
    </motion.div>
  </motion.div>
);

export default ExtremesCard;
