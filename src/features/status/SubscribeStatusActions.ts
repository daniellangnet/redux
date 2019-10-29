import { Dispatch } from 'redux';
import {
  ReconnectedAction,
  ConnectedAction,
  SubscriptionStatusListenerActions,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { StatusActionPayload } from 'api/Status';

export const reconnected = (
  payload: StatusActionPayload
): ReconnectedAction => ({
  type: ActionType.RECONNECTED,
  payload,
});

export const connected = (payload: StatusActionPayload): ConnectedAction => ({
  type: ActionType.CONNECTED,
  payload,
});

export const createSubscribeStatusActionListener = (
  dispatch: Dispatch<SubscriptionStatusListenerActions>
) => ({
  status: (payload: StatusActionPayload) => {
    switch (payload.category) {
      case 'PNReconnectedCategory':
        dispatch(reconnected(payload));
        break;
      case 'PNConnectedCategory':
        dispatch(connected(payload));
        break;
      default:
        break;
    }
  },
});