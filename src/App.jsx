import Data from "./components/Data";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data.length === 0) return;
    // Count lead vocals for each member
    const vocalCounts = data.reduce((acc, song) => {
      // Split multiple vocalists if present (e.g., "Lennon and McCartney" or "Lennon, with McCartney")
      const vocalists = song.Lead.vocal
        .replace("Lennon and/or McCartney", "Lennon-McCartney")
        .replace("McCartney/Lennon", "Lennon-McCartney")
        .replace("Lennon/McCartney", "Lennon-McCartney")
        .replace(" and ", ", ")
        .replace(" with ", ", ")
        .split(", ")
        .filter((name) => name); // Remove empty strings

      vocalists.forEach((vocalist) => {
        // Clean up names (remove parentheses, their contents, and commas)
        const cleanName = vocalist
          .replace(/\s*\([^)]*\)/g, "")
          .replace(/,/g, "")
          .trim();

        // Exclude specific names and empty/N/A values
        const excludedNames = [
          "Sheridan",
          "?",
          "Eric Morecambe",
          "Ernie Wise",
          "N/A",
        ];
        if (cleanName && !excludedNames.includes(cleanName)) {
          acc[cleanName] = (acc[cleanName] || 0) + 1;
        }
      });

      return acc;
    }, {});

    // Convert to array format for chart
    const currChartData = Object.entries(vocalCounts)
      .map(([name, count]) => ({
        name,
        leadVocals: count,
      }))
      .sort((a, b) => b.leadVocals - a.leadVocals); // Sort by most vocals
    setChartData(currChartData);
  }, [data]);

  return (
    <div>
      <h1>Beatles</h1>
      <Chart
        data={chartData}
        YAxisLabel={"Number of Lead Vocals"}
        XAxisLabel={"leadVocals"}
      />
      <Data setData={setData} data={data} />
    </div>
  );
}

export default App;
