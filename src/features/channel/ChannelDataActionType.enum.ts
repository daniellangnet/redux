export enum ChannelDataActionType {
  // fetchAllChannelData()
  FETCH_ALL_CHANNEL_DATA_COMMAND = 'pubnub/FETCH_ALL_CHANNEL_DATA_COMMAND',
  FETCHING_ALL_CHANNEL_DATA = 'pubnub/FETCHING_ALL_CHANNEL_DATA',
  ALL_CHANNEL_DATA_RETRIEVED = 'pubnub/ALL_CHANNEL_DATA_RETRIEVED',
  ERROR_FETCHING_ALL_CHANNEL_DATA = 'pubnub/ERROR_FETCHING_ALL_CHANNEL_DATA',
  // fetchChannelData()
  FETCH_CHANNEL_DATA_COMMAND = 'pubnub/FETCH_CHANNEL_DATA_COMMAND',
  FETCHING_CHANNEL_DATA = 'pubnub/FETCHING_CHANNEL_DATA',
  CHANNEL_DATA_RETRIEVED = 'pubnub/CHANNEL_DATA_RETRIEVED',
  ERROR_FETCHING_CHANNEL_DATA = 'pubnub/ERROR_FETCHING_CHANNEL_DATA',
  // setChannelData()
  SET_CHANNEL_DATA_COMMAND = 'pubnub/SET_CHANNEL_DATA_COMMAND',
  SETTING_CHANNEL_DATA = 'pubnub/SETTING_CHANNEL_DATA',
  CHANNEL_DATA_SET = 'pubnub/CHANNEL_DATA_SET',
  ERROR_SETTING_CHANNEL_DATA = 'pubnub/ERROR_SETTING_CHANNEL_DATA',
  // removeChannelData()
  REMOVE_CHANNEL_DATA_COMMAND = 'pubnub/REMOVE_CHANNEL_DATA_COMMAND',
  REMOVING_CHANNEL_DATA = 'pubnub/REMOVING_CHANNEL_DATA',
  CHANNEL_DATA_REMOVED = 'pubnub/CHANNEL_DATA_REMOVED',
  ERROR_REMOVING_CHANNEL_DATA = 'pubnub/ERROR_REMOVING_CHANNEL_DATA',
  // objects events
  CHANNEL_DATA_SET_EVENT = 'pubnub/CHANNEL_DATA_SET_EVENT',
  CHANNEL_DATA_REMOVED_EVENT = 'pubnub/CHANNEL_DATA_REMOVED_EVENT',
}
