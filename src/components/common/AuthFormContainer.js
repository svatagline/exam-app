import React from 'react'

const AuthFormContainer = ({
    title="",
    children,
    navigationElement,
    image
}) => {
  return (
    <>
      <div className='login_page' >
        {navigationElement && navigationElement}
                <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                    <div className="container">
                        <div className="card login-card">
                            <div className="row no-gutters">
                                <div className="col-md-5">
                                    <img
                                        src={`assets/img/auth/${image?image:'login.jpg'}`}
                                        alt="login"
                                        className="login-card-img"
                                    />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">

                                        <p className="login-card-description">{title}</p>
                                         {children}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
    </>
  )
}

export default AuthFormContainer