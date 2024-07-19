"use client";
import Card from "../../components/ui/dashboard/card/card";
import Chart from "../../components/ui/dashboard/chart/chart";
import styles from "../../components/ui/dashboard/dashboard.module.css";
import Rightbar from "../../components/ui/dashboard/rightbar/rightbar";
import Transactions from "../../components/ui/dashboard/transactions/transactions";
import Loader from "@/components/register/loader";
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    setTimeout(()=>setLoading(false),1000)
  },[]);

  if(loading){
    return <Loader/>
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {/* {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))} */}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
