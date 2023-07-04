"use client";
import DefaultLayout from "@/app/layout/DefaultLayout"
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import DataTable,{createTheme} from 'react-data-table-component';
import axios from "axios";
import Link from 'next/link';

const url = process.env.url;
const per_page:any = process.env.per_page;
const per_page_list:any = process.env.per_page_list;


  
const PdfProcessList=()=> {

  //const [procssingpdf, setProcssingpdf] = useState(false);

  const handleButtonClick = async(state:any) => {
    //console.log('clicked');
    //console.log(state.target.id);
    //setProcssingpdf(true)
    setLoading(true);
    const response = await axios.get(`${url}categories/${state.target.id}`);
    if(response.data.done_split > 0){
      setLoading(false);
      fetchUsers(1)
    }
  };
  
  
  const columns = [
    {
      name: 'Label',
      selector: (row:any) => row.label,
      sortable: true,
    },
    {
      name: 'Value',
      selector: (row:any) => row.value,
      sortable: true,
    },
    {
      name: 'Action',
      cell:(row:any) => {
         return <Link
         href={`/admin/category/create/${row._id}`}
         
       >
        Edit
        </Link>             
      },
      selector: (row:any) => row._id,
      sortable: true,
    }
    
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
  
  
  
  const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(per_page);

  const fetchUsers = async (page:number) => {
		setLoading(true);
    const response = await axios.get(`${url}categories?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = (page:number) => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage:number, page:number) => {
		setLoading(true);

		const response = await axios.get(`${url}categories?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []);


  return (
    <DefaultLayout>

<Link 
      className="inline-flex items-center justify-center rounded-md border border-[#f1e56c] mb-2 py-2 px-10 text-center font-medium text-[#f1e56c] hover:bg-opacity-90 lg:px-8 xl:px-10" 
      href="/admin/category/create">Create
      </Link>
        
        <DataTable
			title="Category List"
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

export default PdfProcessList;