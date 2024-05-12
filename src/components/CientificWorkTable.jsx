import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { useEffect, useContext, useRef } from "react";
import { useState } from 'react';
import { useCallback } from "react";
import { Link } from 'react-router-dom'

const CWLIST_URL = "/cientifics_works/by_author/list";
const CWDELETE_URL = "/cientific_work/delete/"

const CientificWorkTable = () => {
  const { auth } = useContext(AuthContext);
  const [params, setParams] = useState("?page_id=1&page_size=5&author_id=" + auth.user.id)
  const [flag, setFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  let cws = useRef([]);

  const deleteCientificWork = async (id) => {
    const response = await axios.delete(CWDELETE_URL + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.accessToken}`,
      },
      withCredentials: true,
    });
    setFlag(false);
  }

  const fetchData = useCallback(async () => {
    // let cws = [];
    try {
      // console.log(CWLIST_URL + params);
      const response = await axios.get(CWLIST_URL + params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      });
      // TODO: remove console.logs before deployment
      cws.current = JSON.parse(JSON.stringify(response.data));
      // console.log(cws.current);
      setFlag(true);
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Error getting list");
      }
    }
  }, [flag]);

  useEffect(() => {
    fetchData();

    // if (flag) {
    //   console.log(cws.current);
    // }
    // return () => { };
  }, [flag]);

  return (
    <div className="container mx-auto mt-10 px-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Trabalhos Registados</h1>
        <div className="">
          <form>
            <input type="text" name="filter" id="filter" placeholder="Filtro" className="inline-block rounded-md border border-gray-200 outline-none px-3 py-2  w-full" />
          </form>
        </div>
      </div>
      <div className="min-w-full my-8">
        <div className="table font-semibold min-w-full text-base" >
          <div>Titulo do Trabalho</div>
          <div>Resumo do Trabalho</div>
          <div>Tipo de Apresentação</div>
          <div>Tipo de Exposição</div>
          <div></div>
        </div>
        {cws.current.map((item, index) => (
          <div className="table min-w-full" key={index}>
            <div>{item.title}</div>
            <div>{item.resume}</div>
            <div>{item.presentation_type}</div>
            <div>{item.exposition_type}</div>
            <div className="items-center align-baseline space-x-3">
              <Link to={`/home/cientific_work/edit/${item.id}`} className="text-base text-green-500">
                <svg className="inline-block w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </Link>
              <button onClick={() => deleteCientificWork(item.id)} className="text-base text-red-500">
                <svg className="inline-block w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CientificWorkTable