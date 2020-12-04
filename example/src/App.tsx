import React from 'react'

import QuicklySign from 'quicklysign-react'
import 'quicklysign-react/dist/index.css'

const App = () => {
  // const config = {
  //   name_visible: false,
  //   signatory_details_visible: false,
  //   settings_visible: false,
  //   user_defined_attributes_visible: false,
  //   tabs_visible: true,
  //   upload_new_document_enabled: false
  // }

  // const toggle_upload_enabled = () => {
  //   config.upload_new_document_enabled = !config.upload_new_document_enabled
  //   return config
  // }

  return (
    <QuicklySign
      client_id='ahFzfnRoZW1hc3NpdmUtbGl2ZXIYCxILQXBwbGljYXRpb24YgIDA_rXk2AgMogEHc2FuZGJveA'
      url='https://sandbox.quicklysign.com/view?token=CsHU5ep7V7YQHBo2udmFs8pNidC3pG7dmi9clKLGIob'
      post_sign_url=''
    >
      {({ update_ui_configuration }) => (
        <div>
          <button
            onClick={() =>
              update_ui_configuration({
                name_visible: false,
                signatory_details_visible: false,
                settings_visible: false,
                user_defined_attributes_visible: false,
                tabs_visible: true,
                upload_new_document_enabled: true
              })
            }
          >
            some button
          </button>
        </div>
      )}
    </QuicklySign>
  )
}

export default App
