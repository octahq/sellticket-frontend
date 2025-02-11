import { StylesConfig, GroupBase } from 'react-select';
import TimezoneSelect, { ITimezone } from 'react-timezone-select';
import { TbWorld } from 'react-icons/tb';

interface TimezonePickerProps {
  selectedTimezone: ITimezone | string; // ITimezone if using react-timezone-select's type, or string for the timezone value
  setSelectedTimezone: (timezone: ITimezone | string) => void; // Function to update the selected timezone
}

const TimezonePicker: React.FC<TimezonePickerProps> = ({
  selectedTimezone,
  setSelectedTimezone,
}) => {
  const customStyles: StylesConfig<ITimezone, boolean, GroupBase<ITimezone>> = {
    control: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      border: '1px solid #F1F1F1',
      borderRadius: '10px',
      boxShadow: 'none',
      minHeight: '44px',
      padding: '0 12px',
      fontSize: '12px',
      color: '#000',
      '&:hover': {
        backgroundColor: '#f4f4f4',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '12px',
      color: '#b3b3b3',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '10px',
      marginTop: '4px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#F5F5F5' : 'transparent',
      color: '#333333',
      fontSize: '12px',
      padding: '10px 8px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#EAEAEA',
      },
    }),
  };

  return (
    <div className="select-wrapper">
      <p className="font-medium pb-1 text-xs text-[#292D32]">Time zone</p>
      <TimezoneSelect
        value={selectedTimezone}
        onChange={setSelectedTimezone}
        styles={customStyles}
        components={{
          DropdownIndicator: () => <TbWorld size="15px" color="#646668" />,
        }}
      />
    </div>
  );
};

export default TimezonePicker;
