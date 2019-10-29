import { Dispatch } from 'redux';
import {
  MessageRecievedAction,
  MessageSentAction,
  SendingMessageAction,
  ErrorSendingMessageAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Message } from 'api/Message';
import {
  PubNubApiStatus,
  PubNubObjectApiError,
  PubNubObjectApiSuccess,
} from 'api/PubNubApi';

export const sendMessageBegin = <T extends { channel: string }>(
  payload: T
): SendingMessageAction<T> => ({
  type: ActionType.SENDING_MESSAGE,
  payload,
});

export const sendMessageSuccess = <T extends { channel: string }>(
  payload: PubNubObjectApiSuccess<T>
): MessageSentAction<T> => ({
  type: ActionType.MESSAGE_SENT,
  payload,
});

export const sendMessageError = <T extends { channel: string }>(
  payload: PubNubObjectApiError<T>
): ErrorSendingMessageAction<T> => ({
  type: ActionType.ERROR_SENDING_MESSAGE,
  payload,
});

export const sendMessage = (pubnub: any, message: Message) => (
  dispatch: Dispatch
) => {
  dispatch(sendMessageBegin(message));

  pubnub.publish(
    {
      ...message,
    },
    (status: PubNubApiStatus) => {
      if (status.error) {
        let errorData = { id: message.channel, value: { ...message } };

        dispatch(
          sendMessageError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          sendMessageSuccess({
            data: {
              ...message,
            },
          })
        );
      }
    }
  );
};

export const createMessageActionListener = (
  dispatch: Dispatch<MessageRecievedAction>
) => ({
  message: (payload: Message): MessageRecievedAction =>
    dispatch({
      type: ActionType.MESSAGE_RECEIVED,
      payload,
    }),
});
