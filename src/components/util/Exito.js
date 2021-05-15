import Swal from "sweetalert2";
import React, { Component } from "react";

class Exito extends Component {
  handleClick() {
    console.log("Se hizo click");
  }
  render() {
    return Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
export default Exito;
