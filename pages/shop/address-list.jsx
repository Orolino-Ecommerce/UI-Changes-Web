import React from "react";

function AddressList({
  addresses,
  selectedAddressIndex,
  onSelectAddress,
  onDeleteAddress,
}) {
  // console.log("addresses",addresses);
  return (
    <div className="address-list mt-4">
      <h3 className="summary-title">Your Billing Address</h3>
      {addresses.length === 0 ? (
        <p>No addresses added yet.</p>
      ) : (
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className="summary  address-item">
              <div className="address-details">
                <label>
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddressIndex === index}
                    onChange={() => onSelectAddress(index, address?.id)}
                    value={address.address_type}
                  />
                  <span style={{ fontWeight: "700", marginLeft: "5px" }}>
                    {address.name}
                  </span>{" "}
                  {address.address_1}, {address.address_2}, {address.pincode}, ,{" "}
                  {address.country}
                  <br></br>
                  <p style={{ display: "inline-flex" }}>
                    Phone Number : {address?.phonenumber} |{" "}
                    <button onClick={() => onDeleteAddress(address?.id)}>
                      Delete
                    </button>{" "}
                  </p>
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default React.memo(AddressList);
