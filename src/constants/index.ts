export type TEvent = {
  SIGNED: string
  SIGN_LATER: string
  UPDATE_STATUS_SUCCESS: string
  UPDATE_STATUS_FAILURE: string
}

export const EVENT: TEvent = {
  SIGNED: 'signed',
  SIGN_LATER: 'sign_later',
  UPDATE_STATUS_SUCCESS: 'update_status_success',
  UPDATE_STATUS_FAILURE: 'update_status_failure'
}
