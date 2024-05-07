// import  React,{ useContext, useEffect } from 'react'
// import noteContext from '../context/notes/noteContext'

export default function About() {
  // const a=useContext(noteContext)
  // useEffect(()=>{
  //   a.update();
  //
  // },[])

  return (
    <div className="container my-5">
      <h2 className="text-center">About iNotebook</h2>
      <div className="accordion mt-4" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Description
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Introducing iNotebook, the ultimate digital notebook designed to
                revolutionize the way you manage and interact with your data.
                With iNotebook, you have the power to create, read, update, and
                delete (CRUD) your data seamlessly, all within the intuitive and
                user-friendly interface of your digital notebook.
              </strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              User-Friendly Interface
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                User-Friendly Interface: DataMaster boasts an intuitive and
                user-friendly interface, ensuring that users of all technical
                backgrounds can easily navigate and utilize our platform.
              </strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Cross-Platform Compatibility
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                Access your data from anywhere, anytime, and on any device with
                our responsive web design. DataMaster is compatible with various
                web browsers and mobile devices.
              </strong>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Data Security
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>
                We take data security seriously. DataMaster employs
                state-of-the-art encryption and security measures to protect
                your information from unauthorized access and breaches.
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
