'use client';

import * as React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from 'react-icons/io5';
import walletTransferIcon from '../../assets/images/wallettransfer.png';
import emptyWallet from '../../assets/images/empty-wallet.png';
import dollarSign from '../../assets/images/usd-coin-(usdc).png';
import ethIcon from '../../assets/images/eth.png';
import { IoMdCheckmark } from 'react-icons/io';
import Image from 'next/image';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type Props = {
  isShow: boolean;
  setIsShow: (show: boolean) => void;
};

export function MobileTransactionDetails({ isShow, setIsShow }: Props) {
  return (
    <Drawer open={isShow}>
      <DrawerContent className="bg-white rounded-tl-[30px] rounded-tr-[30px]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="w-full flex justify-end">
              {' '}
              <VisuallyHidden>
                <DrawerTitle className="for-src-only">
                  transaction details
                </DrawerTitle>
              </VisuallyHidden>
              <DrawerClose asChild>
                <Button
                  className="w-[24px] h-[24px] rounded-full bg-[#F5F5F5F5]"
                  onClick={() => setIsShow(true)}
                >
                  <IoCloseSharp />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="max-w-[257px] w-full mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-[45px] h-[45px]">
                <Image src={walletTransferIcon} alt="withdrawal icons" />
              </div>
              <div className="text-[#8D9091] text-sm grid place-items-center">
                <p className="text-[#292D32] font-semibold text-lg">
                  Sent to 0x1f05....c2d0
                </p>
                <span>
                  Jan 12th, 2025 <time>11:49pm</time>
                </span>
              </div>
            </div>
            <div className="border-[1px] mt-6 text-center border-[#E8EAEA] rounded-[20px] py-[30px] px-[65px]">
              <h3 className="text-[36px] text-[#292D32] font-bold">$36.89</h3>
              <div className="flex justify-center gap-1 ">
                <Image src={ethIcon} alt="etherium icon" />
                <p className="text-[#47484A] text-sm font-semibold">
                  0.02258 ETH
                </p>
              </div>
            </div>
            <div className="w-full mx-auto pt-6 space-y-4">
              {/* Status Section */}
              <div className="grid grid-cols-3 space-x-2 bg-[#E5F3E2] rounded-[10px] p-3">
                <div className="bg-[#b0dfa7] grid place-items-center w-6 aspect-square rounded-full">
                  <IoMdCheckmark />
                </div>
                <span className="text-[#0E6301] text-sm font-medium">
                  Completed
                </span>
              </div>

              {/* Details Section */}
              <div className="space-y-3 pb-10">
                {/* Wallet Detail */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2 text-[#ABABAB]">
                    <Image src={emptyWallet} alt="empty wallet" />
                    <span>Wallet</span>
                  </div>
                  <span className="text-[#292D32]  font-medium">
                    My wallet 1
                  </span>
                </div>

                {/* Network Fee Detail */}
                <div className="flex justify-between items-center  text-xs">
                  <div className="flex items-center space-x-2 text-[#ABABAB]">
                    <Image src={dollarSign} alt="dollar sign wallet" />
                    <span>Network fee</span>
                  </div>
                  <span className="text-[#6B6A6A] font-medium">$0.57</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
