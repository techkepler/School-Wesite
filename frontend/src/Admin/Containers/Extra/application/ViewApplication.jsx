import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import Pagination from "../../../Components/teacher/Pagination";
import { axiosAdmin } from "../../../../server/Axios";

const ViewApplication = () => {
  const [infoData, setInfoData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // this will fetch teacher data form backend api
  useEffect(() => {
    const fetchTeacher = async () => {
      let res = await axiosAdmin.get("informations/crud/leave/application");
      setInfoData(res.data.results);
      setTotalData(res.data.count);
    };
    fetchTeacher();
  }, []);

  // This will fetch data when page change
  const fetchNewData = async (currentPage) => {
    let res = await axiosAdmin.get(
      `informations/crud/leave/application/?page=${currentPage}&page_size=20`
    );
    setTotalData(res.data.count);
    setInfoData(res.data.results);
  };

  // This function will handle page change
  const handlePageChange = (e) => {
    let currentPage = e.selected + 1;
    setPage(currentPage);
    fetchNewData(currentPage);
  };

  // This function will filter the data when search field is change

  const filterData = () => {
    let filterApplication = infoData;
    if (searchQuery) {
      filterApplication = infoData.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filterApplication;
  };

  // This function will delete data in backend
  const [sucsMsg, setSucsMsg] = useState("");
  const [deleteData, setDeleteData] = useState("");
  const [isDel, setIsDel] = useState(false);

  const yesBtnClick = async () => {
    setIsDel(false);
    let res = await axiosAdmin.delete(
      `informations/crud/leave/application/${deleteData}/`
    );
    setSucsMsg(res.status);
    setTimeout(() => {
      setSucsMsg("");
      fetchNewData(page);
    }, 2000);
  };

  // This funciton will accept or delete the application form

  const takeActionClick = async (e) => {
    const id = e.target.id;
    const value = e.target.value;
    let res = await axiosAdmin.patch(
      `informations/crud/leave/application/${id}/`,
      {
        status: value,
      }
    );
    let newResponse = await axiosAdmin.get(
      "informations/crud/leave/application/"
    );
    setSucsMsg(res.status);
    setTimeout(() => {
      setInfoData(newResponse.data.results);
      setSucsMsg("");
    }, 2000);
  };

  return (
    <>
      {sucsMsg === 204 && (
        <div className="items-center w-full absolute  flex justify-center">
          <p className="px-4 text-base  md:w-[60%] top-0  py-2  text-gray-900 bg-green-500 mx-2 rounded-md fixed text-center z-40">
            Application Deleted Successfully.
          </p>
        </div>
      )}

      {sucsMsg === 200 && (
        <div className="items-center w-full absolute  flex justify-center">
          <p className="px-4 text-base  md:w-[60%] top-0  py-2  text-gray-900 bg-green-500 mx-2 rounded-md fixed text-center z-40">
            Application Updated Successfully.
          </p>
        </div>
      )}

      <div
        className={`flex flex-col items-center  justify-center  md:flex-row gap-10  dark:text-slate-300 my-6 `}
      >
        <input
          type="search"
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name here..............."
          className="w-72 md:w-96  py-2.5 dark:bg-slate-900 rounded-md"
        />
      </div>

      {/* Announcement table start here */}
      <div>
        {filterData().length > 0 && (
          <div className="overflow-auto my-10 bg-slate-100 rounded-md dark:bg-slate-900  box-border shadow-2xl">
            <table className="w-full">
              <thead>
                <tr className=" text-sky-700  dark:text-green-500 bg-slate-300 dark:bg-slate-700 border border-slate-300 dark:border-slate-800 pb-4">
                  <th className="whitespace-nowrap p-5   ">Name</th>
                  <th className="whitespace-nowrap p-5   ">Grade</th>
                  <th className="whitespace-nowrap p-5   ">Date</th>
                  <th className="whitespace-nowrap p-5 ">Status</th>
                  <th className="whitespace-nowrap p-5 ">Action</th>
                  <th className="whitespace-nowrap p-5 ">Other</th>
                </tr>
              </thead>
              <tbody>
                {filterData().length > 0 &&
                  filterData().map((datas, index) => (
                    <tr
                      key={index}
                      className="  text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 pb-4"
                    >
                      <td className="whitespace-nowrap  px-8 py-5 text-sm capitalize text-center">
                        {datas.name}
                      </td>

                      <td className="whitespace-nowrap  px-8 py-5 text-sm capitalize text-center">
                        {datas.grade}
                      </td>
                      <td className="whitespace-nowrap px-8 py-5 text-sm text-center">
                        {datas.date}
                      </td>
                      <td className="whitespace-nowrap px-8 py-5 text-sm  text-center ">
                        {datas.status === "pending" ? (
                          <button
                            className="px-4 py-1.5 text-slate-900 rounded-md bg-sky-500 capitalize "
                            disabled
                          >
                            {datas.status}
                          </button>
                        ) : datas.status === "accept" ? (
                          <button
                            className="px-4 py-1.5 text-slate-900 rounded-md bg-green-500 capitalize"
                            disabled
                          >
                            {datas.status}ed
                          </button>
                        ) : (
                          <button
                            className="px-4 py-1.5 text-slate-900 rounded-md bg-red-500 capitalize"
                            disabled
                          >
                            {datas.status}ed
                          </button>
                        )}
                      </td>
                      <td className="whitespace-nowrap  px-8 py-5 text-sm text-center">
                        <div className="flex gap-2 items-center justify-center">
                          <button
                            className="px-3 py-1 rounded-md capitalize bg-red-500 text-slate-900"
                            id={datas.id}
                            value="reject"
                            onClick={takeActionClick}
                          >
                            reject
                          </button>
                          <button
                            className="px-3 py-1 rounded-md capitalize bg-green-500 text-slate-900"
                            id={datas.id}
                            value="accept"
                            onClick={takeActionClick}
                          >
                            accept
                          </button>
                        </div>
                      </td>

                      <td className="whitespace-nowrap  px-8 py-5 text-sm text-center">
                        <Link to={`/admin/application/view/${datas.id}/`}>
                          <FaEye className="text-lg inline mr-3 text-sky-500 cursor-pointer" />
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
            {searchQuery.length < 1 && (
              <div className="my-5">
                <Pagination
                  totalData={totalData}
                  handlePageChange={handlePageChange}
                  page={page}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <div
        className={`fixed top-16 flex items-center justify-center transition-transform ${
          isDel ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-80 md:w-96 h-36 bg-slate-300  px-4 py-4 rounded-md flex flex-col justify-between">
          <p className="">Are you sure you want to delete this application?</p>

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
    </>
  );
};

export default ViewApplication;