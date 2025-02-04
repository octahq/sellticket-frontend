import * as Yup from 'yup';

export const validateBankDetails = Yup.object().shape({
  bankName: Yup.string().required('Bank name is required'),
  accountNumber: Yup.string().required('Account number is required'),
  amount: Yup.string().required('Amount is required'),
});

export const validateDigitalWalletDetails = Yup.object().shape({
  asset: Yup.string().required('Asset is required'),
  address: Yup.string().required('Wallet address is required'),
  amount: Yup.string().required('Amount is required'),
});
