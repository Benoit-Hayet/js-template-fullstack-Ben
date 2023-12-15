import { useState } from "react";
import { MDBBtn, MDBInput, MDBSwitch } from "mdb-react-ui-kit";
import { useAppDemo } from "../../context/AppContext";

function Register() {
  const [formValue, setFormValue] = useState({
    email: "elea@gmail.com",
    password: "1234",
    admin: false,
  });

  const { register } = useAppDemo();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <MDBInput
        value={formValue.email}
        name="email"
        onChange={onChange}
        id="validationCustom01"
        required
        label="Email"
        type="email"
      />
      <MDBInput
        value={formValue.password}
        name="password"
        onChange={onChange}
        id="validationCustom02"
        required
        label="Password"
        type="password"
      />
      <MDBSwitch
        id="flexSwitchCheckDefault"
        label="Admin"
        onClick={() => setFormValue({ ...formValue, admin: !formValue.admin })}
      />

      <MDBBtn onClick={() => register(formValue)}>Connexion</MDBBtn>
    </div>
  );
}

export default Register;
