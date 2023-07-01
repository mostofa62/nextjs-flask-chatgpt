"use client";
import DefaultLayout from "@/app/layout/DefaultLayout"
//import Chat from "./components/Chat";
import React, { useEffect, useState, useCallback } from "react";
import DataTable,{createTheme} from 'react-data-table-component';
import axios from "axios";
import Link from 'next/link';

const url = process.env.url;
const per_page:any = process.env.per_page;
const per_page_list:any = process.env.per_page_list;

const ManagePDFList = ()=>{

    const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(per_page);
    const [currentPage, setCurrentPage]=useState(1);


    const columns = [
        {
          name: 'File',
          selector: (row:any) => row.filename,
          sortable: true,
        },
        {
          name: 'Category',
          selector: (row:any) => row.category.label,
          sortable: true,
        },
        {
          name: 'Managed',
          cell:(row:any) => {

            return(
              <div>
                <button className="text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleDeleteClick} id={row._id}>
              Delete PDF
            </button>

            {row.processed < 1 ? <button className="text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleButtonClick} id={row._id}>
              Submit
            </button>:
              <span className="btn btn-primary">Already Submitted</span>
            }
              </div>
            )
            
          },
          selector: (row:any) => row.processed,
          sortable: true,
        },
    ];

    createTheme('solarized', {
        text: {
          primary: '#f1e56c',
          secondary: '#2aa198',
        },
        background: {
          default: '#002b36',
        },
        context: {
          background: '#cb4b16',
          text: '#f1e56c',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');
    //function
    const handleButtonClick = async(state:any) => {
        
        setLoading(true);
        const response = await axios.get(`${url}process_single/${state.target.id}`);
        if(response.data.done_split > 0){
          setLoading(false);
          fetchProcess(currentPage);
        }
    };

    const handleDeleteClick = async(state:any) => {
        
      setLoading(true);
      const response = await axios.get(`${url}delete_single/${state.target.id}`);
      if(response.data.done_delete > 0){
        setLoading(false);
        fetchProcess(currentPage);
      }
  };

    const fetchProcess = useCallback(async (page:number) => {
            console.log('fetchProcess:',url)
            setLoading(true);
            const response = await axios.get(`${url}pdflist?page=${page}&per_page=${perPage}`);
            setCurrentPage(page);
            setData(response.data.data);
            setTotalRows(response.data.total);
            setLoading(false);
    },[perPage]);

    const handlePageChange = (page:number) => {
        console.log('handlePageChange:',url)    
        setCurrentPage(page);
        fetchProcess(page);
    };

    const handlePerRowsChange = async (newPerPage:number, page:number) => {
		setLoading(true);
        console.log('handlePerRowsChange:',url)
		const response = await axios.get(`${url}pdflist?page=${page}&per_page=${newPerPage}`);

		setData(response.data.data);
		setPerPage(newPerPage);
        setCurrentPage(page);
		setLoading(false);
	};

    useEffect(() => {
        //console.log('URL here :',url)
        fetchProcess(currentPage); // fetch page 1 of users
            
    }, [currentPage,fetchProcess]);

    return(
        <DefaultLayout>
        
        <DataTable
			title="Manage PDF"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
      paginationPerPage={perPage}
			paginationTotalRows={totalRows}
      paginationRowsPerPageOptions={per_page_list}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
      theme="solarized"

		/>
      
            
    </DefaultLayout>
    )

}

export default ManagePDFList;