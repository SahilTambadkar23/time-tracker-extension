const BreakdownCard = ({ data }) => {
    const total = data.reduce((acc, cur) => acc + cur.total, 0);
    const productive = data
      .filter(d => d._id.includes("github") || d._id.includes("leetcode"))
      .reduce((acc, cur) => acc + cur.total, 0);
  
    const productivePct = ((productive / total) * 100).toFixed(1);
  
    return (
      <div className="bg-green-100 text-green-900 p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-2">Productivity Breakdown</h2>
        <p>📘 Productive Time: {(productive / 1000 / 60).toFixed(1)} mins</p>
        <p>🕒 Total Time: {(total / 1000 / 60).toFixed(1)} mins</p>
        <p>⚡ Productivity Score: {productivePct}%</p>
      </div>
    );
  };
  
  export default BreakdownCard;
  