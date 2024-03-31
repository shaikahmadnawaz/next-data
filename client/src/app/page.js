import DataTable from "@/components/table/data-table";
import { DataTableColumns } from "@/components/table/data-table-columns";
import { data } from "@/utils/data";

export default function Home() {
  return (
    <main className="container flex flex-col items-center w-full py-8 gap-y-8 max-w-screen-2xl">
      <DataTable data={data} columns={DataTableColumns} />
    </main>
  );
}
