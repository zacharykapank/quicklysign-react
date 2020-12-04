import React from 'react'

import QuicklySign from 'quicklysign-react'
import 'quicklysign-react/dist/index.css'

const App = () => {
  return (
    <QuicklySign client_id='' url='' post_sign_url=''>
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
            some button to update ui
          </button>
        </div>
      )}
    </QuicklySign>
  )
}

export default App
