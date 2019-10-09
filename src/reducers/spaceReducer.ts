import {
  ObjectsActionTypes,
  OBJECTS_GET_SPACES,
  OBJECTS_CREATE_SPACE,
  OBJECTS_CREATE_SPACE_ERROR,
  OBJECTS_DELETE_SPACE,
  OBJECTS_GET_SPACES_ERROR,
  OBJECTS_GET_SPACE_BY_ID_ERROR,
  OBJECTS_UPDATE_SPACE,
  OBJECTS_GET_SPACE_BY_ID,
} from '../types/actions';
import {
  ObjectsResponsePayload,
  ObjectsActionPayload,
  ObjectsStatusPayload,
} from '../types/Objects';

interface SpaceState {
  data: object[];
  error: string;
  space: object;
}

let initialState: SpaceState = {
  data: [],
  error: '',
  space: {},
};

const createSpace = (state: SpaceState, payload: ObjectsResponsePayload) => ({
  ...state,
  data: [...state.data, payload.data],
});

const createSpaceError = (
  state: SpaceState,
  payload: ObjectsStatusPayload
) => ({
  ...state,
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

const updateSpace = (state: SpaceState, payload: ObjectsActionPayload) => {
  let spaceIndex = state.data.findIndex(
    (space: any) => space.id === payload.message.data.id
  );
  return {
    ...state,
    data: [
      ...state.data.slice(0, spaceIndex),
      payload.message.data,
      ...state.data.slice(spaceIndex + 1),
    ],
  };
};

const deleteSpace = (state: SpaceState, payload: ObjectsActionPayload) => {
  let spaceIndex = state.data.findIndex(
    (space: any) => space.id === payload.message.data.id
  );
  return {
    ...state,
    data: [
      ...state.data.slice(0, spaceIndex),
      ...state.data.slice(spaceIndex + 1),
    ],
  };
};

const getSpaces = (state: SpaceState, payload: ObjectsResponsePayload) => ({
  ...state,
  data: payload.data,
});

const getSpaceById = (state: SpaceState, payload: ObjectsResponsePayload) => ({
  ...state,
  space: payload.data,
});

const getSpaceError = (state: SpaceState, payload: ObjectsStatusPayload) => ({
  ...state,
  error: payload.errorData ? payload.errorData.error.message : payload.message,
});

export const spaceReducer = (
  state = initialState,
  action: ObjectsActionTypes
): SpaceState => {
  switch (action.type) {
    case OBJECTS_CREATE_SPACE:
      return createSpace(state, action.payload);
    case OBJECTS_CREATE_SPACE_ERROR:
      return createSpaceError(state, action.payload);
    case OBJECTS_DELETE_SPACE:
      return deleteSpace(state, action.payload);
    case OBJECTS_GET_SPACES:
      return getSpaces(state, action.payload);
    case OBJECTS_GET_SPACE_BY_ID:
      return getSpaceById(state, action.payload);
    case OBJECTS_GET_SPACES_ERROR:
    case OBJECTS_GET_SPACE_BY_ID_ERROR:
      return getSpaceError(state, action.payload);
    case OBJECTS_UPDATE_SPACE:
      return updateSpace(state, action.payload);
    default:
      return state;
  }
};
