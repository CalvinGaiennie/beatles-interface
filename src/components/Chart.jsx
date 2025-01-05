import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart({ data, YAxisLabel, XAxisLabel }) {
  // Add data validation
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: YAxisLabel,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey={XAxisLabel} fill="#8884d8" name="Lead Vocals" />
      </BarChart>
    </div>
  );
}

export default Chart;
