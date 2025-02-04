'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { financeWalletTab } from '../../common/constants';
import bgImg from '../../../assets/images/vector.png';
import { Button } from '../../ui/button';
import { WithdrawalMethod } from '@/components/Modals/WithdrawalMethod';
import { BankDetails } from '@/components/Modals/BankDetails';
import { DigitalWalletWithdrawal } from '@/components/Modals/DigitalWalletWithdrawal';
import { ConfirmWithdrawal } from '@/components/Modals/ConfirmWithdrawal';
import { WithdrawalSuccess } from '@/components/Modals/WithdrawalSucess';

const FirstLayer = () => {
  const [activeTab, setActiveTab] = useState(financeWalletTab[0]?.id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false); //opens the bank withdrawal modal
  const [open, setOpen] = useState<boolean>(false); //opens the digital wallet withdrawal modal
  const [isActive, setIsActive] = useState<boolean>(false);
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>(''); //stores the withdrawal method user selected
  const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false); // opens the success modal for withdrawal

  return (
    <div>
      <Tabs defaultValue={financeWalletTab[0]?.id} onValueChange={setActiveTab}>
        {/* Tab Navigation */}

        <TabsList className="flex justify-start gap-2">
          {financeWalletTab.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`rounded-[20px] w-[126px] h-[38px] p-0 focus:outline-none focus:ring-0 relative overflow-hidden ${
                activeTab === tab.id
                  ? ' bg-gradient-to-r from-[#124BD9] to-[#F74B51]'
                  : 'border-2 border-[#C5C5C5] text-[#C5C5C5]'
              }`}
            >
              <div
                className={` grid place-items-center rounded-[20px] w-[122px] h-[32px]    bg-white`}
              >
                {tab.value}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        {financeWalletTab.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            style={{ backgroundImage: `url(${bgImg.src})` }}
            className="mt-6 border-[#F2F2F2] border-[1px] py-5 px-6 rounded-[20px] bg-[#FAFAFA]"
          >
            <div className="flex md:items-center md:justify-between flex-col md:flex-row">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[#616162] text-sm md:text-base">
                    {tab.value}
                  </p>
                  <button className="text-[8px] md:text-xs text-[#616162] border-2 border-[#DADADA] bg-[#F2F2F2] rounded-3xl p-[4px]">
                    Show
                  </button>
                </div>
                <p className="font-bold text-xl md:text-2xl pt-1 md:pt-2 ">
                  ₦6,254,123
                </p>
              </div>
              <Button
                className="primary-btn rounded-[10px] w-fit mt-4 md:mt-0"
                onClick={() => setIsOpen(true)}
              >
                Withdraw
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <WithdrawalMethod
        active={isOpen}
        setActive={setIsOpen}
        setIsShow={setIsShow}
        setOpen={setOpen}
        withdrawalMethod={withdrawalMethod}
        setWithdrawalMethod={setWithdrawalMethod}
      />
      <BankDetails
        active={isShow}
        setActive={setIsShow}
        setOpen={setIsOpen}
        setOpenConfirm={setIsActive}
      />
      <DigitalWalletWithdrawal
        active={open}
        setActive={setOpen}
        setOpen={setIsOpen}
        setOpenConfirm={setIsActive}
      />
      <ConfirmWithdrawal
        active={isActive}
        setActive={setIsActive}
        setOpen={setOpen}
        setIsOpen={setIsShow}
        withdrawalMethod={withdrawalMethod}
        setIsShowSuccess={setIsShowSuccess}
      />
      <WithdrawalSuccess active={isShowSuccess} setActive={setIsShowSuccess} />
    </div>
  );
};
export default FirstLayer;
