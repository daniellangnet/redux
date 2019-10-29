import { Dispatch } from 'redux';
import { ObjectsResponsePayload, ObjectsListInput } from 'api/Objects';
import {
  SpaceDeletedAction,
  SpaceUpdatedAction,
  ErrorCreatingSpaceAction,
  ErrorFetchingSpaceByIdAction,
  ErrorFetchingSpacesAction,
  SpaceRetrievedAction,
  SpacesRetrievedAction,
  SpaceCreatedAction,
  CreatingSpaceAction,
  FetchingSpacesAction,
  FetchingSpaceByIdAction,
  UpdatingSpaceAction,
  ErrorUpdatingSpaceAction,
  DeletingSpaceAction,
  ErrorDeletingSpaceAction,
} from 'actions/Actions';
import { ActionType } from 'actions/ActionType.enum';
import { Space } from 'api/Space';
import {
  PubNubObjectApiSuccess,
  PubNubObjectApiError,
  PubNubApiStatus,
  ItemMap,
} from 'api/PubNubApi';

export const createSpaceBegin = <T>(payload: T): CreatingSpaceAction<T> => ({
  type: ActionType.CREATING_SPACE,
  payload,
});

export const spaceCreated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceCreatedAction<T> => ({
  type: ActionType.SPACE_CREATED,
  payload,
});

export const createSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorCreatingSpaceAction<T> => ({
  type: ActionType.ERROR_CREATING_SPACE,
  payload,
});

export const spaceListRetrieved = <T>(
  payload: PubNubObjectApiSuccess<ItemMap<T>>
): SpacesRetrievedAction<T> => ({
  type: ActionType.SPACES_RETRIEVED,
  payload,
});

export const fetchSpacesBegin = (payload: {
  label: string;
}): FetchingSpacesAction => ({
  type: ActionType.FETCHING_SPACES,
  payload,
});

export const fetchSpacesError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingSpacesAction<T> => ({
  type: ActionType.ERROR_FETCHING_SPACES,
  payload,
});

export const spaceRetrievedById = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceRetrievedAction<T> => ({
  type: ActionType.SPACE_RETRIEVED,
  payload,
});

export const fetchSpaceByIdBegin = (
  payload: string
): FetchingSpaceByIdAction => ({
  type: ActionType.FETCHING_SPACE_BY_ID,
  payload,
});

export const fetchSpaceByIdError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorFetchingSpaceByIdAction<T> => ({
  type: ActionType.ERROR_FETCHING_SPACE_BY_ID,
  payload,
});

export const spaceUpdated = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceUpdatedAction<T> => ({
  type: ActionType.SPACE_UPDATED,
  payload,
});

export const updateSpaceBegin = <T>(payload: T): UpdatingSpaceAction<T> => ({
  type: ActionType.UPDATING_SPACE,
  payload,
});

export const updateSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorUpdatingSpaceAction<T> => ({
  type: ActionType.ERROR_UPDATING_SPACE,
  payload,
});

export const spaceDeleted = <T>(
  payload: PubNubObjectApiSuccess<T>
): SpaceDeletedAction<T> => ({
  type: ActionType.SPACE_DELETED,
  payload,
});

export const deleteSpaceBegin = (payload: string): DeletingSpaceAction => ({
  type: ActionType.DELETING_SPACE,
  payload,
});

export const deleteSpaceError = <T>(
  payload: PubNubObjectApiError<T>
): ErrorDeletingSpaceAction<T> => ({
  type: ActionType.ERROR_DELETING_SPACE,
  payload,
});

export const createSpace = (pubnub: any, space: Space) => (
  dispatch: Dispatch
) => {
  dispatch(createSpaceBegin(space));

  pubnub.createSpace(
    {
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: space.id, value: space };

        dispatch(
          createSpaceError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceCreated({
            data: response.data,
          })
        );
      }
    }
  );
};

export const updateSpace = (pubnub: any, space: Space) => (
  dispatch: Dispatch
) => {
  dispatch(updateSpaceBegin(space));

  pubnub.updateSpace(
    {
      ...space,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: space.id, value: space };

        dispatch(
          updateSpaceError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceUpdated({
            data: response.data,
          })
        );
      }
    }
  );
};

export const deleteSpace = (pubnub: any, id: string) => (
  dispatch: Dispatch
) => {
  dispatch(deleteSpaceBegin(id));

  pubnub.deleteSpace(
    id,
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: id };

        dispatch(
          deleteSpaceError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceDeleted({
            data: response.data,
          })
        );
      }
    }
  );
};

export const fetchSpaces = (
  pubnub: any,
  options: ObjectsListInput = {},
  label: string = 'all'
) => (dispatch: Dispatch) => {
  dispatch(fetchSpacesBegin({ label: label }));

  pubnub.getSpaces(
    { ...options },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: '' };

        dispatch(
          fetchSpacesError({
            code: status.category,
            message: status.errorData,
            data: errorData,
            label: label,
          })
        );
      } else {
        dispatch(
          spaceListRetrieved({
            label: label,
            data: (response.data as Space[]).reduce(
              (result: { [key: string]: Space }, value) => {
                if (value.description === null) {
                  value.description = ''; // TODO: reference app cannot handle missing description
                }

                result[value.id] = value;
                return result;
              },
              {}
            ),
          })
        );
      }
    }
  );
};

export const fetchSpaceById = (
  pubnub: any,
  spaceId: string,
  include?: object
) => (dispatch: Dispatch) => {
  dispatch(fetchSpaceByIdBegin(spaceId));

  pubnub.getSpace(
    {
      spaceId,
      ...include,
    },
    (status: PubNubApiStatus, response: ObjectsResponsePayload) => {
      if (status.error) {
        let errorData = { id: spaceId };

        dispatch(
          fetchSpaceByIdError({
            code: status.category,
            message: status.errorData,
            data: errorData,
          })
        );
      } else {
        dispatch(
          spaceRetrievedById({
            data: response.data,
          })
        );
      }
    }
  );
};
