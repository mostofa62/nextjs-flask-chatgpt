"use client";
import React , {useCallback, useEffect, useState, createContext } from "react";
import useLocalStorage from "@/app/hooks/useLocalStorage";
interface AuthContextType{
    token:string |undefined|null,
    displayName:string |undefined|null,
    isLoggedIn:boolean,
    userId:string|undefined|null,
    role:string|undefined|null,
    chatCategory:any,
    activeMessageId:string|undefined|null,
    login:(token:string, expirationTime:Date, role:string,displayName:string, userId:string)=>void,
    logout:()=>void,
    selectedCat:(chatCategory:any)=>void
    selectedMsg:(activeMessageId:string|undefined|null)=>void
    

}


let logoutTimer:ReturnType<typeof setTimeout>;
const AuthContext = createContext<AuthContextType>({
    token :null,
    displayName:null,
    isLoggedIn: false,
    role:null,
    userId:null,
    chatCategory:{"value":"","label":""},
    activeMessageId:null,
    login:(token:string, expirationTime:Date, role:string,displayName:string, userId:string)=>{},
    logout:()=>{},
    selectedCat:(chatCategory:Object | null|undefined)=>{},
    selectedMsg:(activeMessageId:string|undefined|null)=>{}    

});

const calculateRemainingTime = (expirationTime:any)=>{
    const currentTime  = new Date().getTime();
    //console.log(expirationTime)
    const adjExpirationTime  = new Date(expirationTime).getTime();
    const remaintingDuration = adjExpirationTime - currentTime;

    return remaintingDuration;
};

const removeAllFromStorage=()=>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('Loguser');
        localStorage.removeItem('DisplayName');
        localStorage.removeItem('userId');        
        localStorage.removeItem('chatCategory');
        localStorage.removeItem('activeMessageId');

    }
}

const retriveStoredToken = ()=>{

    //let storedToken,storedExpirationDate,remaintingTime;
    //if(typeof window !== 'undefined'){
        const storedToken  = typeof window !== 'undefined'?localStorage.getItem('token'):null;
        const storedExpirationDate = typeof window !== 'undefined'?localStorage.getItem('expirationTime'):new Date().toString()
        const role = typeof window !== 'undefined'?localStorage.getItem('Loguser'):null;
        const displayName = typeof window !== 'undefined'?localStorage.getItem('DisplayName'):null;
        const userId = typeof window !== 'undefined'?localStorage.getItem('userId'):null;
        const chatCategory = typeof window !== 'undefined'?localStorage.getItem('chatCategory'):null;
        const activeMessageId = typeof window !== 'undefined'?localStorage.getItem('activeMessageId'):null;

        //console.log(storedExpirationDate)
        const remaintingTime = calculateRemainingTime(storedExpirationDate);
    
    //}
    
    
    if(remaintingTime <= 3600){
        removeAllFromStorage();
        return null;
    }
    
    return{
        token: storedToken,
        duration: remaintingTime,
        role:role,
        displayName:displayName,
        userId:userId,
        chatCategory:chatCategory,
        activeMessageId:activeMessageId
    }
};

export default AuthContext;



export const AuthContextProvider = (props:any)=>{

    
    //const [tokenId, setTokenId] = useLocalStorage('token',tokenData?.token);
    //const [expTime, setExpTime] = useLocalStorage('expirationTime',tokenData?.duration);
    
    const tokenData = retriveStoredToken();
    
    

    let initialToken;
    let intialMsgId;
    let initUserId;
    let initDisplayName;
    if(tokenData){
        initialToken = tokenData.token;
        intialMsgId = tokenData.activeMessageId;
        initUserId = tokenData.userId;
        initDisplayName = tokenData.displayName;
    }
    const [token , setToken] = useState(initialToken);
    const [msgId , setMsgId] = useState(intialMsgId);
    const [userId, setUserId] = useState(initUserId);
    const [displayName, setDisplayName ] = useState(initDisplayName);
    const userIsLoggedIn = !!token;
    const role = tokenData?.role;
    
    let chatCategory = tokenData?.chatCategory;
    
    if(typeof chatCategory !='undefined' && chatCategory!==null){
        chatCategory = JSON.parse(chatCategory);
    }

    
    
    
    const logoutHandler= useCallback(()=>{
        setToken(null);
        setMsgId(null);
        removeAllFromStorage();
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    },[]);

    const loginHandler = (
        token:string, 
        expirationTime:Date,
        role:string,
        displayName:string,
        userId:string
        )=>{
        setToken(token);
        setUserId(userId);
        setDisplayName(displayName);
        if(typeof window !== 'undefined'){
            //console.log('here');
            localStorage.setItem('token',token);
            localStorage.setItem('expirationTime',expirationTime.toString());
            localStorage.setItem('Loguser',role);
            localStorage.setItem('DisplayName',displayName);
            localStorage.setItem('userId',userId);
            
        }
        const remaintingTime =  calculateRemainingTime(expirationTime.toString());

        logoutTimer= setTimeout(logoutHandler, remaintingTime);
        //logoutTimer =  setTimeout(logoutHandler, 3000);
    };

    const selectedCatHandler=(chatCategory:Object | null|undefined)=>{
        if(typeof window !== 'undefined' 
        && typeof chatCategory != 'undefined' 
        && chatCategory!==null){
            localStorage.setItem('chatCategory',JSON.stringify(chatCategory));
        }
    }

    

    const selectedMsgandler=(activeMessageId:string | null|undefined)=>{
        if(typeof window !== 'undefined' 
        && typeof activeMessageId != 'undefined' 
        && activeMessageId!==null){
            setMsgId(activeMessageId);
            localStorage.setItem('activeMessageId',activeMessageId);
        }
    }
    
    

    useEffect(()=>{
        if(tokenData){
            console.log(tokenData.duration);
            logoutTimer =  setTimeout(logoutHandler, tokenData.duration);
        }

    },[tokenData,logoutHandler]);
    const contextValue:AuthContextType = {
        token:token,
        isLoggedIn:userIsLoggedIn,
        role:role,
        displayName:displayName,
        userId:userId,
        chatCategory:chatCategory,
        activeMessageId:msgId,
        login:loginHandler,
        logout :logoutHandler,
        selectedCat:selectedCatHandler,
        selectedMsg:selectedMsgandler        
    };
    return <AuthContext.Provider value={contextValue}>
    {props.children}
    </AuthContext.Provider>;
}