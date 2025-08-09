export const fetchDashboardData = async () => {
  const res = await fetch("http://localhost:5000/dashboard-data");
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return await res.json();
};
