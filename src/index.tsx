import * as React from 'react'
import { EVENT } from './constants'
import IframeResizer from 'iframe-resizer-react'

export type Message = {
  action: string
  [key: string]: any
}

export type Signatory = {
  name: string
  email: string
  mobile_number: string
  role: string
}

export type UI_ConfigurationProps = {
  name_visible: boolean
  signatory_details_visible: boolean
  settings_visible: boolean
  user_defined_attributes_visible: boolean
  tabs_visible: boolean
  upload_new_document_enabled: boolean
}

type Actionables = {
  update_status: (status: string) => void
  switch_tab: (document_key: string) => void
  update_ui_configuration: (ui_configuration: UI_ConfigurationProps) => void
  add_signatory: ({ name, email, mobile_number, role }: Signatory) => void
}

// TODO add correct types
type ParameterProps = {
  url: string
  message_listener?: any
  on_update_success_listener?: any
  on_update_failure_listener?: any
  post_sign_url?: any
  parameters_debug?: boolean
  ui_configuration?: any
  client_id: string
  children?(actions: Actionables): React.ReactElement
}

const QuicklySign: React.FC<ParameterProps> = ({
  url,
  message_listener,
  on_update_success_listener,
  on_update_failure_listener,
  post_sign_url,
  parameters_debug,
  ui_configuration,
  client_id,
  ...rest
}) => {
  const resizerRef = React.useRef() as any

  const pageURL =
    url +
    '&client_id=' +
    client_id +
    '&post_sign_url=' +
    encodeURI(post_sign_url)

  // const host_url = window.location.origin

  const message_callback = (message_data: any) => {
    const message = message_data.message
    if (message.event) {
      message_listener(message)
    }
    if (
      message.event === EVENT.UPDATE_STATUS_SUCCESS &&
      on_update_success_listener
    ) {
      on_update_success_listener(message)
    }
    if (
      message.event === EVENT.UPDATE_STATUS_FAILURE &&
      on_update_failure_listener
    ) {
      on_update_failure_listener(message)
    }
  }

  const _message_queue: Message[] = []

  const _queue_message = function (message: Message) {
    _message_queue.push(message)
    _send_message_when_ready()
  }

  let _timeout: any = null

  const _send_message_when_ready = function () {
    if (!resizerRef) {
      if (_timeout) {
        clearTimeout(_timeout)
        _timeout = null
      }
      _timeout = setTimeout(_send_message_when_ready, 50)
      return
    }
    for (var i = 0; i < _message_queue.length; i++) {
      resizerRef.current.sendMessage(_message_queue.pop())
    }
  }

  const add_signatory = function ({
    name,
    email,
    mobile_number,
    role
  }: Signatory) {
    _queue_message({
      action: 'add_signatory',
      signatory: {
        name: name,
        email: email,
        mobile_number: mobile_number,
        role: role
      }
    })
  }

  const update_ui_configuration = function (
    ui_configuration: UI_ConfigurationProps
  ) {
    if (!ui_configuration) {
      ui_configuration = {
        name_visible: false,
        // "document_action_button_visible":false,
        signatory_details_visible: false,
        settings_visible: false,
        user_defined_attributes_visible: false,
        tabs_visible: false,
        upload_new_document_enabled: true
      }
    }

    _queue_message({
      action: 'update_ui_configuration',
      ui_configuration: ui_configuration
    })
  }

  const switch_tab = function (document_key: string) {
    _queue_message({
      action: 'switch_document_tab',
      switch_tab_config: { document_key: document_key }
    })
  }

  const update_status = function (status: string) {
    _queue_message({ action: 'update_status', status: status })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rest.children
        ? rest.children({
            update_status,
            switch_tab,
            update_ui_configuration,
            add_signatory
          })
        : null}
      <IframeResizer
        // @ts-ignore
        forwardRef={resizerRef}
        heightCalculationMethod='lowestElement'
        inPageLinks
        log
        onMessage={message_callback}
        src={pageURL}
        style={{ width: '1px', minWidth: '100%' }}
      />
    </div>
  )
}

export default QuicklySign
