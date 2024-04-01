"use client";
import { useEffect, useState } from "react";
import DataTable from "@/components/table/data-table";
import { DataTableColumns } from "@/components/table/data-table-columns";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/data`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData.data.allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="container flex flex-col items-center w-full py-8 gap-y-8">
      <DataTable data={data} columns={DataTableColumns} />
    </main>
  );
}
