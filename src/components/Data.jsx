import { useEffect, useState } from "react";

function Data({ setData, data }) {
  useEffect(() => {
    fetch("/beatles.json") // Assuming your JSON file is named 'data.json' in the public folder
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div>
      {data && (
        // You can now use your data here
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default Data;
