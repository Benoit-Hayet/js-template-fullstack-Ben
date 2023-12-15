import { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useAppDemo } from "../../context/AppContext";

function Login() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const { login } = useAppDemo();

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
      <MDBBtn onClick={() => login(formValue)}>Connexion</MDBBtn>
    </div>
  );
}

export default Login;
