import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';
import MessageWithIcon from './MessageWithIcon';

export default Yup.object({
  email: Yup.string().email(isEmail).required(isRequiredMessage),
});
