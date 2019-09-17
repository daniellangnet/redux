import { MessageActionPayload } from '../types/Message';
import { AppActions, MESSAGE } from '../types/actions';
import { Dispatch } from 'redux';

export const createMessageActionListener = (dispatch: Dispatch<AppActions>) => (
  payload: MessageActionPayload
): AppActions =>
  dispatch({
    type: MESSAGE,
    payload,
  });
