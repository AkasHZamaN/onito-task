import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [tableData, setTableData] = useState([]);

  const onSubmit = (data, event) => {
    event.preventDefault();

    if (data) {
      setTableData((dataList) => [...dataList, data]);
      localStorage.setItem("data", JSON.stringify(data));
    }
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-3/4 m-6 mx-auto bg-slate-100 ">
          <h1 className="mx-24 font-bold pt-6">Receipt Details</h1>
          <hr className="border-black w-28 mx-24" />

          <div className="flex justify-center items-center gap-4">
            <p className="w-52 font-medium">Date</p>
            <div>
              <input
                type="text"
                placeholder="Type Date"
                className="input input-primary w-full max-w-xs mt-4"
                {...register("date", {
                  required: {
                    value: true,
                    message: "Date is Required",
                  },
                })}
              />
              <label className="label">
                {errors.date?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.date.message}
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="w-52 font-medium">Amount</p>
            <div>
              <input
                type="text"
                placeholder="Type Amount in INR"
                className="input input-primary w-full max-w-xs"
                {...register("amount", {
                  required: {
                    value: true,
                    message: "Amount is Required",
                  },
                  pattern: {
                    value: /[0-9]/,
                    message: "Provide a valid Amount",
                  },
                })}
              />
              <label className="label">
                {errors.amount?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.amount.message}
                  </span>
                )}
                {errors.amount?.type === "pattern" && (
                  <span className="label-text-alt text-error">
                    {errors.amount.message}
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="w-52 font-medium">Payment Mode</p>
            <div>
              <select
                className="select select-primary w-full max-w-xs mb-4"
                {...register("paymentMethod", {
                  required: {
                    value: true,
                    message: "Payment Method is Required",
                  },
                })}
              >
                <option value={"default"} disabled>
                  Select Your Payment..
                </option>
                <option value={"Cash"}>Cash</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <p className="w-52 font-medium">Remark</p>
            <div>
              <input
                type="text"
                placeholder="Type Remark"
                className="input input-primary w-full max-w-xs"
                {...register("remark", {
                  required: {
                    value: true,
                  },
                })}
                
              />
            </div>
          </div>
                
          <div className="w-3/4 px-6 flex justify-end items-center py-6">
            <div>
              <button className="btn btn-outline btn-error mr-4 ">
                Cancel
              </button>
            </div>
            <div>
              <button type="submit" className="btn bg-green-800 text-white">Submit</button>
            </div>
          </div>
        </div>
      </form>


      {/* table */}

      <div className="overflow-x-auto w-3/4 mx-auto">
        <h1 className="text-center font-medium my-6">Form Data Information</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tableInfo, index) => (
              <tr key={index + 1}>
                <th>{index + 1}</th>
                <td>{tableInfo.date}</td>
                <td>{tableInfo.amount}</td>
                <td>{tableInfo.paymentMethod}</td>
                <td>{tableInfo.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
