import { useState } from "react";
import "./App.css";
import EntryCard from "./components/EntryCard";
import Parking from "./parking.jpg";
//
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [vehicleCount, setVehicleCount] = useState(0);
  const date = new Date();

  // parking list
  const [parkingList, setParkingList] = useState([]);

  // function and action

  // add vehicle to parking
  const addParking = (userData) => {
    if (carCheck(userData)) {
      toast.error("The Vehicle already Exist");
    } else {
      setParkingList([...parkingList, userData]);

      // successfully addedt to parking
      toast.success(`Vehicle ${userData.vehicleNumber} entered parking`);
      setVehicleCount(vehicleCount + 1);
    }
  };

  // check is car exist
  const carCheck = (userData) => {
    for (let i of parkingList) {
      if (i.vehicleNumber === userData.vehicleNumber && i.exitTime === null) {
        return true;
      }
    }
    return false;
  };

  // exit button
  const handleExit = (vehicle) => {
    const newList = parkingList.map((parking) => {
      if (parking.vehicleNumber === vehicle.vehicleNumber) {
        const date = new Date();
        parking.exitTime = date.toString().slice(16, 25);
      }
      return parking;
    });
    setParkingList([...newList]);

    // left parking
    toast.info(`Vehicle ${vehicle.vehicleNumber} left parking`);
    setVehicleCount(vehicleCount - 1);
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-10 md:w-3/4 w-4/5 mx-auto">
        <h4 className="text-2xl font-bold greenColor mb-5">CarsPark</h4>

        <div className="mt-9">
          {/* -------------------------------- input card or add vehicle section -------------------------- */}

          <div className="w-full flex flex-wrap items-center  justify-center ">
            <div className="lg:w-1/2 w-full flex  md:mt-11">
              <img src={Parking} alt="parking" width="100%" />
            </div>
            <div className="lg:w-1/2 w-full">
              <EntryCard addParking={addParking} />
            </div>
          </div>
          {/* -------------------------------- / input card or add vehicle section -------------------------- */}
          {/* --------------------------------------- Record table table ------------------------------------- */}

          <div className=" bg-white w-full p-10 shadow-md rounded mt-10 overflow-x">
            <h4 className="greenColor font-bold mb-5 text-lg">
              Vehicles Parked on Date :- {date.toString().slice(4, 15)}
              <span className="float-right">
                Vehicle Parked ({vehicleCount})
              </span>
            </h4>
            <table className="table-auto w-full rounded overflow-scroll">
              <thead className="greenBackColor text-white">
                <tr>
                  <th>Driver Name</th>
                  <th>Vehicle Brand / Model</th>
                  <th>Vehicle Number</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                </tr>
              </thead>
              <tbody className="greenBackColorLight text-center ">
                {parkingList
                  ? parkingList.map((vehicle) => {
                      return (
                        <tr key={vehicle.vehicleNumber} className="my-5">
                          <td>{vehicle.driverName}</td>
                          <td>{vehicle.vehicleName}</td>
                          <td>{vehicle.vehicleNumber}</td>
                          <td>{vehicle.enterTime}</td>
                          <td>
                            {vehicle.exitTime ? (
                              vehicle.exitTime
                            ) : (
                              <button
                                className="py-1 px-5 greenBackColor rounded text-white"
                                onClick={() => {
                                  handleExit(vehicle);
                                }}
                              >
                                Exit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : "No Enteries Curently"}
              </tbody>
            </table>
          </div>

          {/* --------------------------------------- / Record table table ------------------------------------- */}
        </div>
      </div>
    </>
  );
}

export default App;
