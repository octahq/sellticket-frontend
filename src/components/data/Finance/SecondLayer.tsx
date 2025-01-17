'use client';
import { useState } from 'react';
import SearchInput from '@/components/Layout/ProtectedLayout/SearchInput';
import { IoFilterSharp } from 'react-icons/io5';
import DownloadIcon from '../../../assets/images/document-download.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  fetchedTransactions,
  transHeaders,
} from '@/components/common/constants';
import CustomTable from '@/components/ui/CustomTable/CustomTable';
import { TableCell, TableRow } from '@/components/ui/table';
// import emptyState from '../../../../public/emptystate.svg';
import { useRouter } from 'next/navigation';

const SecondLayer = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center  mt-10">
        <h5 className="font-semibold text-[#0D0D0D]">Transaction history</h5>
        <Button
          className="border  md:hidden  border-[#AFCBAA] bg-[#E6F7E3] py-[2px] px-2 rounded-xl"
          onClick={() => router.push('/finance/view-all-transactions')}
        >
          View all
        </Button>
      </div>

      <div className="justify-between items-center pt-2 hidden md:flex">
        <div className="h-[30px]">
          <SearchInput
            placeholder="Search items"
            value={searchTerm} // Bind value to state
            setValue={setSearchTerm} // Pass the setter function
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button className="border  border-[#EFEFEF] py-[6px] px-2 rounded-xl">
            <IoFilterSharp />
            <span>Recently Added</span>
          </Button>
          <Button className="border  border-[#AFCBAA] bg-[#E6F7E3] py-[6px] px-2 rounded-xl">
            <Image src={DownloadIcon} alt="download icon" />
            <span>Save to CSV</span>
          </Button>
        </div>
      </div>
      {/* transaction table for tablet and desktop */}
      <div className="pt-3 hidden md:block">
        <CustomTable headers={transHeaders} skeletonRows={4}>
          {fetchedTransactions?.length ? (
            fetchedTransactions.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-0 text-[#5B5B5B]">
                <TableCell>
                  <div className="w-[32px] bg-[#F8D0B8] overflow-hidden p-[4px] aspect-square rounded-full">
                    <div className="rounded-full overflow-hidden">
                      <Image src={row.logo} alt="bank logo" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {row.name}
                    <p className="text-xs text-[#8D9091]">{row.id}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {row.type === 'debit' ? 'Outflow' : 'Inflow'}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell> ₦{row.price}</TableCell>
                <TableCell
                  className={
                    row.status === 'Successful'
                      ? 'text-green-600 cursor-pointer relative'
                      : row.status === 'Failed'
                      ? 'text-red-600 cursor-pointer relative'
                      : 'text-yellow-600 cursor-pointer relative'
                  }
                >
                  <span>{row.status}</span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={transHeaders.length}
                className="text-center py-6"
              >
                <div className="flex flex-col items-center">
                  {/* <Image
                    src={emptyState}
                    alt="No Transactions"
                    className="w-20 h-20 mb-4"
                  /> */}
                  <p className="text-lg font-semibold text-gray-700">
                    No Transactions Yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Send money, fund accounts, make bills payment to record
                    transactions
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </CustomTable>
      </div>
      {/* transaction data for mobile */}
      <div className="pt-5 md:hidden">
        <p className="text-sm text-[#5B5B5B] font-semibold pb-3"> Today</p>
        <div>
          <ul className="grid  gap-4">
            {fetchedTransactions?.length ? (
              fetchedTransactions.map((row, rowIndex) => (
                <li
                  key={rowIndex}
                  className="flex items-center justify-between font-medium text-sm"
                >
                  <div className="flex gap-2 flex-2">
                    <div className="w-[32px] bg-[#F8D0B8] overflow-hidden p-[4px] aspect-square rounded-full grid place-items-center">
                      <div className="rounded-full overflow-hidden">
                        <Image src={row.logo} alt="bank logo" />
                      </div>
                    </div>
                    <div>
                      <p>{row.name}</p>
                      <p className="text-[#8D9091] text-xs">{row.time}</p>
                    </div>
                  </div>
                  <div>
                    <p>₦{row.price}</p>
                  </div>
                </li>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={transHeaders.length}
                  className="text-center py-6"
                >
                  <div className="flex flex-col items-center">
                    {/* <image
                      // src={emptyState}
                      alt="No Transactions"
                      className="w-20 h-20 mb-4"
                    /> */}
                    <p className="text-lg font-semibold text-gray-700">
                      No Transactions Yet
                    </p>
                    <p className="text-sm text-gray-500">
                      Send money, fund accounts, make bills payment to record
                      transactions
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SecondLayer;
