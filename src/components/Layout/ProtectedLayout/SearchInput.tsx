import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div className="flex items-center w-full h-[40px] rounded-[8px] border border-[#E8EAEA] bg-[#FAFAFA] px-[12px] shadow-sm">
      {/* Search Icon */}
      <Search className="w-[16px] h-[16px] text-[#828282]" />

      {/* Input Field */}
      <Input
        type="text"
        placeholder="Search"
        className="ml-[8px] w-full bg-transparent text-[14px] text-[#333333] placeholder:text-[#828282] outline-none"
      />
    </div>
  );
};

export default SearchInput;
