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
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import emptyState from '../../../assets/images/noresult.png';
import { useRouter } from 'next/navigation';
import { MobileTransactionDetails } from '@/components/Modals/MobileTransactionDetails';

const SecondLayer = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center  mt-10">
        <h5 className="font-medium text-[#0D0D0D]">Transaction history</h5>
        <Button
          className="border font-normal text-xs  md:hidden  border-[#AFCBAA] bg-[#E6F7E3] py-[4px] px-2 rounded-xl"
          onClick={() => router.push('/finance/view-all-transactions')}
        >
          View all
        </Button>
      </div>

      <div className="justify-between items-center pt-2 hidden md:flex">
        <div className="h-[40px]">
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
              <TableRow
                key={rowIndex}
                className="  text-[#5B5B5B] !border-none"
              >
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
                  <Image
                    src={emptyState}
                    alt="No Transactions"
                    className="w-20 h-20 mb-4"
                  />
                  <p className="font-semibold text-[#292D32]">
                    There’s nothing here, yet
                  </p>
                  <p className="text-xs text-[#929292]">
                    Make your first withdrawal so you can see your transaction
                    history here
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
          <section className=" max-h-96 overflow-y-scroll">
            <ul className="grid  gap-4">
              {fetchedTransactions?.length ? (
                fetchedTransactions.map((row, rowIndex) => (
                  <li
                    key={rowIndex}
                    className="flex items-center justify-between font-medium text-sm"
                    onClick={() => setIsShow(true)}
                  >
                    <div className="flex gap-2 flex-2">
                      <figure className="w-[32px] bg-[#F8D0B8] overflow-hidden p-[4px] aspect-square rounded-full grid place-items-center">
                        <div className="rounded-full overflow-hidden">
                          <Image src={row.logo} alt={`${row.name} logo`} />
                        </div>
                      </figure>
                      <div>
                        <p>{row.name}</p>
                        <time className="text-[#8D9091] text-xs">
                          {row.time}
                        </time>
                      </div>
                    </div>
                    <div>
                      <p>₦{row.price}</p>
                    </div>
                  </li>
                ))
              ) : (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={transHeaders.length}
                        className="text-center py-6"
                      >
                        <div className="flex flex-col items-center">
                          <Image
                            src={emptyState}
                            alt="No Transactions"
                            className="w-20 h-20 mb-4"
                          />
                          <p className="font-semibold text-[#292D32]">
                            There’s nothing here, yet
                          </p>
                          <p className="text-xs text-[#929292]">
                            Make your first withdrawal so you can see your
                            transaction history here
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </ul>
          </section>
        </div>
      </div>
      <MobileTransactionDetails
        isShow={isShow}
        setIsShow={() => setIsShow(false)}
      />
    </div>
  );
};
export default SecondLayer;
