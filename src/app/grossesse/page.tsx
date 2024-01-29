"use client";
import RegisterGrossesseForm from "@/components/grossesse/RegisterGrossesse";
import BlogPage from "../../../pages/blogpage";


export default function blog(){
  return(
    <div  id="root">
    <RegisterGrossesseForm isOpened={true} />
    </div>
  )
}
