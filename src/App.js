
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import Table from "react-bootstrap/Table";

function App() {
  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const getChargersData = () => {
      axios.get("https://randomuser.me/api/").then((res) => {
        console.log(res);
        setUserData(res.data.results[0].picture.large);
        setUserName(res.data.results[0].name);
        let dataFromApi = data;
        dataFromApi.push({
          image: res.data.results[0].picture.large,
          name: res.data.results[0].name,
        });
        setData(dataFromApi);
      });
    };
    getChargersData();
    const interval = setInterval(() => {
      getChargersData();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Picture</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <>
                    <tr>
                      <td>{data.name.title}</td>
                      <td>{data.name.first}</td>
                      <td>{data.name.last}</td>
                      <td>
                        <img src={data.image} alt="" srcset="" />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <div className="container1">
        <button
          className="btn mb-3"
          style={{
            fontSize: "18px",
            fontWeight: "700",
            border: "2px solid black",
          }}
          onClick={() => setShow(true)}
        >
          List
        </button>
        <div>
          <img style={{ height: "350px", width: "auto" }} src={userData} />
        </div>
        .
        <div>
          <p>My name is</p>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>
            {userName.title} {userName.first} {userName.last}
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
