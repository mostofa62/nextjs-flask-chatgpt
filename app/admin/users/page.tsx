"use client";
import DefaultLayout from "@/app/layout/DefaultLayout"
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import DataTable,{createTheme} from 'react-data-table-component';
import axios from "axios";
import Link from 'next/link';

const url = process.env.url;

  interface ContainerProps {
    children: React.ReactNode
  }
  
  const Container = ({ children }: ContainerProps) => (
    <div className="flex flex-col items-center justify-between gap-4 min-h-60 bg-zinc-800 w-full max-w-2xl py-10 px-4 rounded-xl h-fit">
      {children}
    </div>
  )
const PdfProcessList=()=> {

  //const [procssingpdf, setProcssingpdf] = useState(false);

  const handleButtonClick = async(state:any) => {
    //console.log('clicked');
    //console.log(state.target.id);
    //setProcssingpdf(true)
    setLoading(true);
    const response = await axios.get(`${url}users/${state.target.id}`);
    if(response.data.done_split > 0){
      setLoading(false);
      fetchUsers(1)
    }
  };
  
  
  const columns = [
    {
      name: 'Name',
      selector: (row:any) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row:any) => row.email,
      sortable: true,
    },
    {
      name: 'Action',
      cell:(row:any) => {
         return <Link
         href={`/admin/users/create/${row._id}`}
         
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
	const [perPage, setPerPage] = useState(2);

  const fetchUsers = async (page:number) => {
		setLoading(true);
    const response = await axios.get(`${url}users?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = (page:number) => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage:number, page:number) => {
		setLoading(true);

		const response = await axios.get(`${url}users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []);


  return (
    <DefaultLayout>
        
        <DataTable
			title="User List"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
      paginationPerPage={perPage}
			paginationTotalRows={totalRows}
      paginationRowsPerPageOptions={[2,4,8,12,15]}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
      theme="solarized"

		/>
      
        
    </DefaultLayout>
  )
}

export default PdfProcessList;