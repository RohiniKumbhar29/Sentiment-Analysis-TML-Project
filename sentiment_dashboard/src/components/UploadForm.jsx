import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setMessage("✅ Upload & analysis complete!");
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setMessage("");
  };

  return (
    <motion.div
      className="bg-[#1f1f30] border border-gray-700 text-white rounded-xl shadow-md px-6 py-5 w-full flex flex-col md:flex-row justify-between items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Left: Icon + Label + Choose File */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="bg-blue-800 p-3 rounded-full shadow-lg text-blue-300">
          <FiUploadCloud size={28} />
        </div>
        <div>
          <label className="text-base font-semibold text-white">Upload CSV</label>
          <div className="mt-2 flex items-center gap-2">
            <label className="cursor-pointer inline-block bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm font-medium">
              Choose File
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            {file && (
              <button
                className="text-red-400 hover:text-red-500 transition"
                onClick={handleReset}
                title="Remove file"
              >
                <FiTrash2 size={20} />
              </button>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-400 truncate max-w-xs">
            {file?.name || "No file chosen"}
          </p>
        </div>
      </div>

      {/* Right: Upload Button */}
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-white text-sm font-semibold transition duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
        {message && (
          <p className="mt-2 text-sm text-center text-gray-300">{message}</p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadForm;
