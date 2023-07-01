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


const ConversationList =()=>{

    return(
        <DefaultLayout>
            
        </DefaultLayout>
    )

}

export default ConversationList;