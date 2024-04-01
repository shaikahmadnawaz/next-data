"use client";
import { useEffect } from "react";
import DataTable from "@/components/table/data-table";
import { DataTableColumns } from "@/components/table/data-table-columns";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/redux/dataSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <main className="container flex flex-col items-center w-full py-8">
      <DataTable data={data} columns={DataTableColumns} />
    </main>
  );
}
