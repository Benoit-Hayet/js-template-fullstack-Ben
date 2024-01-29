import { MDBBtn, MDBChart, MDBSelect } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useAppDemo } from "../context/AppContext";

export default function AdminDemo() {
  const { apiService, setUser } = useAppDemo();
  const [itemPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    const result = await apiService.post("/uploads", formData);
    setUser(result);
  };
  const getPaginateUsers = async () => {
    const result = await apiService.get(
      `/users?page=${page}&itemperpage=${itemPerPage}`
    );
    setUsers(result.data);
  };
  useEffect(() => {
    getPaginateUsers();
  }, [page, itemPerPage]);
  return (
    <>
      <form className="d-flex flex-column mb-5" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Envoyer le média</button>
      </form>
      <MDBChart
        type="bar"
        data={{
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday ",
          ],
          datasets: [
            // First dataset (bar)
            {
              label: "Impressions",
              data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
              order: 2,
            },
            // Second dataset (line)
            {
              label: "Impressions (absolute top) %",
              data: [211, 2543, 2745, 3123, 2765, 1485, 587],
              type: "line",
              order: 1,
              backgroundColor: "rgba(66, 133, 244, 0.0)",
              borderColor: "#94DFD7",
              borderWidth: 2,
              pointBorderColor: "#94DFD7",
              pointBackgroundColor: "#94DFD7",
              lineTension: 0.0,
            },
          ],
        }}
      />
      {users.map((user) => (
        <span key={user.id}>
          id: {user.id} email: {user.email}
        </span>
      ))}
      <MDBBtn onClick={() => setPage(page <= 1 ? 1 : page - 1)}>
        Précédent
      </MDBBtn>
      <span>{page}</span>
      <MDBBtn onClick={() => setPage(page + 1)}>Suivant</MDBBtn>
      <MDBSelect
        onChange={(val) => {
          setItemPerPage(val.value);
        }}
        data={[
          { text: "2", value: 2 },
          { text: "4", value: 4 },
          { text: "50", value: 30 },
        ]}
      />
    </>
  );
}
