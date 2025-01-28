import { Search } from 'lucide-react';
import React from 'react';

interface SearchInputProps {
  placeholder?: string; // Optional placeholder
  value: string; // Controlled input value
  setValue: (value: string) => void; // Function to update the value
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search',
  value,
  setValue,
}) => {
  return (
    <div className="flex items-center w-full h-full rounded-[8px] border border-[#E8EAEA] bg-[#FAFAFA] px-[12px] shadow-sm">
      {/* Search Icon */}
      <Search className="w-[16px] h-[16px] text-[#828282]" />

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value || ''} // Ensure value is never undefined
        onChange={(e) => setValue(e.target.value)}
        className="ml-[8px] w-full bg-transparent text-[14px] text-[#333333] placeholder:text-[#828282] outline-none"
      />
    </div>
  );
};

export default SearchInput;
