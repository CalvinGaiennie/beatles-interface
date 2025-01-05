import Data from "./components/Data";
import Chart from "./components/Chart";
import { useState } from "react";
function App() {
  const [data, setData] = useState(null);

  return (
    <div>
      <h1>Beatles</h1>
      <Chart data={data} />
      <Data setData={setData} data={data} />
    </div>
  );
}

export default App;
