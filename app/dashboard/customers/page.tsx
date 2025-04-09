import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
  const customers = await fetchCustomers();
  const filteredCustomers = await Promise.all(
    customers.map((row) => fetchFilteredCustomers(row.name))
  ).then((results) => results.filter((result) => result !== null).flat());

  console.log({ filteredCustomers, customers });
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <CustomersTable customers={filteredCustomers} />
    </div>
  );
}
