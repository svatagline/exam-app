import React from 'react'

const PrivetPageContainer = ({children,title,headerAction}) => {
  return (
   <>
      <div className='dashboardPage'>
        <div className='card'>
          <div className='card-body'>
            <div className='pb-2 d-flex justify-content-between align-items-center'>
              <h5 className='card-title'  >
                {title}
              </h5>
              {headerAction && headerAction}
            </div>
            <div>
              {children}
            </div>
          </div>

        </div>
      </div>
   </>
  )
}

export default PrivetPageContainer