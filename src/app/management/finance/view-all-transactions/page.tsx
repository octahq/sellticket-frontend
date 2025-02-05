'use client';

import { useState } from 'react';
import SearchInput from '@/components/Layout/ProtectedLayout/SearchInput';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';
import { IoFilterSharp } from 'react-icons/io5';
import {
  fetchedTransactions,
  transHeaders,
} from '@/components/common/constants';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import emptyState from '@/assets/images/noresult.png';
import Image from 'next/image';

const ViewAllTransactions = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div
      initial={{ x: '100%' }} // Start off-screen
      animate={{ x: 0 }} // Slide into view
      exit={{ x: '-100%' }} // Slide out on unmount
      transition={{ duration: 0.5, ease: 'easeInOut' }} // Animation duration and easing
    >
      <div className="grid grid-cols-3 place-items-center">
        <Button
          className=" justify-self-start pl-0 "
          onClick={() => router.back()}
        >
          <BiArrowBack className="text-2xl" />{' '}
        </Button>
        <h2 className="font-semibold text-xl">Transactions</h2>
      </div>
      <div className="flex justify-between items-center gap-4 pt-8">
        <div className="h-[36px] flex-1">
          <SearchInput
            placeholder="Search items"
            value={searchTerm}
            setValue={setSearchTerm}
          />
        </div>
        <Button className="border h-[36px] border-[#AFCBAA] bg-[#E6F7E3] py-[6px] px-2 rounded-xl">
          <IoFilterSharp />
        </Button>
      </div>
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
        </div>
      </div>
    </motion.div>
  );
};
export default ViewAllTransactions;
