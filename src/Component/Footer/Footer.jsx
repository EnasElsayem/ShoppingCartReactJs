import React from 'react'

export default function Footer() {
  return (
    <>

      <footer className='bg-light my-5 py-5 mb-auto'>

        <div className="container">
          <h4>Get the FreshCart App</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <form>
            <div className="row">
              <div className="col-md-10">
                <input type="text" placeholder='email' className='form-control' />
              </div>
              <div className="col-md-2">
                <button className='btn btn-success'>Add to link</button>
              </div>
            </div>
          </form>
        </div>
      </footer>
    
    </>
    // <div className='bg-dark text-white p-3 text-center fixed-bottom'>
    //   <h3>Footer</h3>
    // </div>
  )
}
