import React, { useState } from "react";

// toast for alert
import { toast } from "react-toastify";

const EntryCard = (props) => {
  // details fetching
  const [driverName, setDriverName] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  // destructure props
  const { addParking } = props;

  // function or action to preform
  const handleAdd = (e) => {
    e.preventDefault();

    // checking data field
    if (driverName && vehicleNumber && vehicleName) {
      const date = new Date();
      const userData = {
        driverName: driverName,
        vehicleName: vehicleName,
        vehicleNumber: vehicleNumber,
        enterTime: date.toString().slice(16, 25),
        exitTime: null,
      };

      addParking(userData);

      //   setting back values to initial
      setDriverName("");
      setVehicleName("");
      setVehicleNumber("");
    } else {
      // warning  alert
      toast.warn("Fill All Details");
    }
  };

  return (
    <div className="bg-white w-full p-10 shadow-md rounded  mt-5 mx-auto">
      <h6 className="text-lg font-bold greenColor">Add Vehicle</h6>
      <form action="" className="mt-5">
        {/* -------------------------------- driver name --------------------- */}
        <div className="mb-3">
          <label htmlFor="driverName">Driver Name</label>
          <br />
          <input
            type="text"
            name="driverName"
            id="driverName"
            placeholder="E.g. David"
            className="rounded greenBackColorLight mt-1 w-full px-2 py-1"
            required
            value={driverName}
            onChange={(e) => {
              setDriverName(e.target.value);
            }}
          />
        </div>
        {/* ------------------------------- vehicle model / Brand ----------------------------- */}
        <div className="mb-3">
          <label htmlFor="carModel">Vehicle Brand / Model</label>
          <br />
          <input
            type="text"
            name="carModel"
            id="carModel"
            className="rounded greenBackColorLight mt-1 w-full px-2 py-1"
            placeholder="E.g. Toyota"
            required
            value={vehicleName}
            onChange={(e) => {
              setVehicleName(e.target.value);
            }}
          />
        </div>
        {/* ----------------------------------- vehicle number ----------------------------------- */}
        <div className="mb-3">
          <label htmlFor="carNumber">Vehicle Number</label>
          <br />
          <input
            type="text"
            name="carNumber"
            id="carNumber"
            placeholder="E.g. LS 4781"
            className="rounded greenBackColorLight mt-1 w-full px-2 py-1 "
            required
            value={vehicleNumber}
            onChange={(e) => {
              setVehicleNumber(e.target.value);
            }}
          />
        </div>
        {/* ------------------------- button -------------------------------- */}
        <button
          className="greenBackColor w-full text-white py-2 mt-5 rounded font-medium"
          onClick={handleAdd}
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default EntryCard;
