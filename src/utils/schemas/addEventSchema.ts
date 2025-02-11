import * as Yup from 'yup';

export const validateEventDetails = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  category: Yup.string().required('Category is required'),
  startDate: Yup.string().required('Start date is required'),
  startTime: Yup.string().required('Start time is required'),
  endDate: Yup.string().required('End date is required'),
  endTime: Yup.string().required('End Time is required'),
  description: Yup.string().required('Description is required'),
});
