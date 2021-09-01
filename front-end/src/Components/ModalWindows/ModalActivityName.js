import React, { useState } from "react";
import Modal from "simple-react-modal";
import "./modals.css";

export default function ModalActivityName({ onNewCategoryAdded }) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleShowModal = () => {
    setShow(true);
  };

  const handleHideModal = () => {
    setShow(false);

    return fetch(`http://localhost:3333/categories`, {
      body: JSON.stringify({
        title: inputValue,
      }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((newCategory) => {
        onNewCategoryAdded(newCategory);
      });
    // POST to /categories
    // to create new category
    // with name in body
    // and then call onNewCategoryAdded with server respose data
  };

  const fillInputValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <button
        className="reg-or-log-buttons create-btn"
        onClick={handleShowModal}
      >
        Создать занятие
      </button>
      <Modal show={show} onClose={() => setShow(false)}>
        <div className="write-activity">
          <input
            type="text"
            className="write-activity-name"
            value={inputValue}
            onChange={fillInputValue}
            required
          />
          <img
            onClick={handleHideModal}
            className="check-mark"
            src="https://image.flaticon.com/icons/png/512/1287/1287087.png"
            alt="checked"
          />
        </div>
      </Modal>
    </div>
  );
}

// export default class ModalActivityName extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   show = () => {
//     this.setState({ show: true });
//   };

//   close = () => {
//     // POST to /categories
//     // to create new category
//     // with name in body
//     this.setState({ show: false });
//   };

//   render() {
//     return (
//       <div>
//         <button className="reg-or-log-buttons create-btn" onClick={this.show}>
//           Создать запись
//         </button>
//         <Modal show={this.state.show} onClose={this.close}>
//           <div className="write-activity">
//             <input type="text" className="write-activity-name" required/>
//             {/* <button onClick={this.close}> */}
//             <img
//               onClick={this.close}
//               className="check-mark"
//               src="https://image.flaticon.com/icons/png/512/1287/1287087.png"
//               alt="checked"
//             />
//             {/* </button> */}
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }
