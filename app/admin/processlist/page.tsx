"use client";
import DefaultLayout from "@/app/layout/DefaultLayout"
//import Chat from "./components/Chat";
import React, { useEffect, useState } from "react";
import DataTable,{createTheme} from 'react-data-table-component';
import axios from "axios";

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
    const response = await axios.get(`${url}process_single/${state.target.id}`);
    if(response.data.done_split > 0){
      setLoading(false);
      fetchUsers(1)
    }
  };
  
  
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
      name: 'Processed',
      cell:(row:any) => {
        if(row.processed < 1)
        return (<button className="text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleButtonClick} id={row._id}>
          Do Process
        </button>)
        else
         return <span className="btn btn-primary">Already Processed</span>
        
        
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
  
  
  
  const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(2);

  const fetchUsers = async (page:number) => {
		setLoading(true);
    const response = await axios.get(`${url}processpdf?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = (page:number) => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage:number, page:number) => {
		setLoading(true);

		const response = await axios.get(`${url}processpdf?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []);


  return (
    <DefaultLayout>
        <Container>
        <DataTable
			title="Process PDF List"
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
      
        </Container>    
    </DefaultLayout>
  )
}

export default PdfProcessList;