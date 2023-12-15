import { MDBChart } from "mdb-react-ui-kit";

export default function AdminDemo() {
  // const adminContext = useAdmin();
  // const appContext = useAppDemo();

  return (
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
  );
}
