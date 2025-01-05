import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart({ data }) {
  // Add data validation
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

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
  const chartData = Object.entries(vocalCounts)
    .map(([name, count]) => ({
      name,
      leadVocals: count,
    }))
    .sort((a, b) => b.leadVocals - a.leadVocals); // Sort by most vocals

  return (
    <div>
      <BarChart
        width={600}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "Number of Lead Vocals",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="leadVocals" fill="#8884d8" name="Lead Vocals" />
      </BarChart>
    </div>
  );
}

export default Chart;
