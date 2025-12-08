import React from 'react'

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
        <footer className="bg-dark text-white py-3 mt-auto w-100" style={{ position: 'fixed', left: 0, bottom: 0, zIndex: 1000 }}>
            <div className="container text-center">
                &copy; {currentYear} Employee Management System. All Rights Reserved.
            </div>
        </footer>
    </div>
  )
}

export default FooterComponent