import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Customers',
};



export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchFilteredCustomers(query);

  const customers = await fetchFilteredCustomers(query)

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
