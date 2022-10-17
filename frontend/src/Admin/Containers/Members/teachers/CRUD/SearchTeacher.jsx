import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import { axiosAdmin } from "../../../../../server/Axios";

const SearchTeacher = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [deleteData, setDeleteData] = useState("");
  const [isDel, setIsDel] = useState(false);
  const [sucsMsg, setSucsMsg] = useState("");

  const [responseData, setResponseData] = useState([]);
  const [isResponse, setIsResponse] = useState(true);

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    let res = await axiosAdmin.get(
      `teachers/crud/teacher/?id=${id}&name=${name}`
    );
    setResponseData(res.data.results);
    if (res.data.results.length < 1) {
      setIsResponse(false);
    } else {
      window.scrollTo(0, 0);
    }

    setTimeout(() => {
      setIsResponse(true);
    }, 3000);
  };

  const yesBtnClick = async () => {
    setIsDel(false);
    let res = await axiosAdmin.delete(`teachers/crud/teacher/${deleteData}/`);
    let newResponse = await axiosAdmin.get(
      `teachers/crud/teacher/?id=${id}&name=${name}`
    );
    setSucsMsg(res.status);
    setTimeout(() => {
      setSucsMsg("");
      setResponseData(newResponse.data.results);
    }, 2000);
  };

  return (
    <>
      {/* Response Msg */}
      {sucsMsg === 204 && (
        <div className="items-center w-full absolute  flex justify-center">
          <p className="px-4 text-base  md:w-[60%] top-0  py-2  text-gray-900 bg-green-500 mx-2 rounded-md fixed text-center z-40">
            Teacher Deleted Successfully.
          </p>
        </div>
      )}

      {!isResponse && (
        <div className="items-center w-full absolute  flex justify-center">
          <p className="px-4 text-base  md:w-[60%] top-0  py-2  text-gray-900 bg-red-500 mx-2 rounded-md fixed text-center z-40">
            No Teacher Found .
          </p>
        </div>
      )}

      {/* Delete Modal Start here */}

      <div
        className={`fixed top-16 flex items-center justify-center transition-transform ${
          isDel ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-80 md:w-96 h-36 bg-slate-300  px-4 py-4 rounded-md flex flex-col justify-between">
          <p className="">Are you sure you want to delete this data?</p>

          <p className="flex gap-6  mt-4 justify-end text-slate-900">
            <button
              className="px-4 py-1   bg-red-500 rounded-md text-sm font-semibold"
              onClick={yesBtnClick}
            >
              Yes
            </button>
            <button
              className="px-2 py-1  bg-sky-500 rounded-md text-sm font-semibold"
              onClick={() => setIsDel(false)}
            >
              Cancel
            </button>
          </p>
        </div>
      </div>

      {/* delete modal end here */}

      {/* teacher table start here */}
      <div className="overflow-auto my-10 bg-slate-100 rounded-md dark:bg-slate-900  box-border shadow-2xl">
        <table className="w-full">
          <tbody>
            {responseData.length > 0 &&
              responseData.map((datas, index) => (
                <tr
                  key={index}
                  className="  text-slate-700 dark:text-slate-400 hover:bg-gray-300 dark:hover:bg-slate-700 border-b-[1px] border-slate-300 dark:border-slate-800 pb-4"
                >
                  <td className="whitespace-nowrap  w-20 h-10 flex items-center justify-center my-4">
                    <img
                      src={datas.image}
                      alt=""
                      className=" w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap p-5 text-sm">{datas.id}</td>
                  <td className="whitespace-nowrap p-5 text-sm capitalize">
                    {datas.name}
                  </td>
                  <td className="whitespace-nowrap p-5 text-sm">
                    {datas.email}
                  </td>
                  <td className="whitespace-nowrap p-5 text-sm">
                    {datas.phone}
                  </td>
                  <td className="whitespace-nowrap p-5 text-sm capitalize">
                    {datas.subject}
                  </td>
                  <td className="whitespace-nowrap p-5 text-sm">
                    {datas.address}
                  </td>
                  {datas.faculty && (
                    <td className="whitespace-nowrap p-5 text-sm">
                      <button
                        className={`${
                          datas.faculty === "Science"
                            ? "bg-green-600"
                            : datas.faculty === "Management"
                            ? "bg-yellow-600"
                            : "bg-sky-600"
                        } rounded-md px-2 py-1 text-sm text-slate-100`}
                      >
                        {datas.faculty.slice(0, 3)}
                      </button>
                    </td>
                  )}
                  <td className="whitespace-nowrap  p-5 text-sm">
                    <Link to={`/admin/teachers/edit/${datas.id}/`}>
                      <FaEdit className="text-lg inline mr-3 text-sky-500 cursor-pointer" />
                    </Link>

                    <VscTrash
                      className="text-lg text-red-500 ml-4 inline cursor-pointer"
                      onClick={() => {
                        setDeleteData(datas.id);
                        setIsDel(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* teacher table end here */}

      {/* teacher search form start here */}
      <div className="flex flex-col w-full items-center justify-center my-10">
        <form className="my-10 dark:bg-slate-900  w-full md:w-[29rem] pt-5 pb-14 px-4 rounded-lg md:px-8  lg:px-12  border border-slate-500">
          <h1 className="text-2xl md:text-3xl  text-slate-800 dark:text-slate-300 text-center">
            Search Teacher
          </h1>
          <div className="stu_id mt-12 mb-8 relative">
            <label
              htmlFor="stu_id"
              className="absolute left-4 px-1 block -top-3 bg-white dark:bg-slate-900  text-sm text-sky-600"
            >
              Teacher ID
            </label>
            <input
              type="text"
              name="id"
              id="id"
              onChange={(e) => setId(e.target.value)}
              value={id}
              className="form-input dark:bg-slate-900 dark:text-slate-300 py-3 px-2 w-full rounded-md "
            />
          </div>{" "}
          <div className="stu_name my-10 relative">
            <label
              htmlFor="name"
              className="absolute left-4 px-1 block -top-3  bg-white dark:bg-slate-900 text-sm text-sky-600"
            >
              Teacher Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-input dark:bg-slate-900  dark:text-slate-300 px-2 py-3 w-full rounded-md "
            />
          </div>
          <div className="mt-10">
            <button
              className="bg-[#7582eb] w-full rounded-md py-4 text-sm font-semibold hover:bg-[#4453c8]"
              disabled={!id && !name}
              onClick={handleSubmitBtn}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* teacher search form end here */}
    </>
  );
};

export default SearchTeacher;