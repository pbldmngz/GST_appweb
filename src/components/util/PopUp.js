import Swal from "sweetalert2";
import React, { Component } from "react";

class PopUp extends Component {
  handleClick() {
    console.log("Se hizo click");
  }
  render() {
    return Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      //  Read more about isConfirmed, isDenied below
      if (result.isConfirmed) {
        this.handleClick.bind(this);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
export default PopUp;
