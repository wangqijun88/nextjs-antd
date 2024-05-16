"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/request/client";

import { Button, Image as IMG } from "antd";
import "./page.css";

type IuserInfo = {
  avatar: string;
  nickName?: string;
  userId: number;
  userName?: string;
};

function ShadcnPage(props: any) {
  const [userInfo, setUserInfo] = useState<IuserInfo | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  //const defaultHost = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  //const router = useRouter();
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);


  const handleClick = async () => {
    //const res = await get("/webapi/sns/v1.1/user/4332319/info");
    const res = await get("/api/user");
    setUserInfo(res.data as IuserInfo);
  };

  const handleImgClick = async () => {
    const res: any = await get("/api/image");
    /* const blob = new Blob([res.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob); */
    //console.log(res.imgData)
    //setImageURL("data:image/jpg;base64," + res.imgData);
    let imageData = "data:image/png;base64," + btoa(new Uint8Array(res.imgData.data).reduce((res, byte) => res + String.fromCharCode(byte), ''))
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = imageData;
    img.onload = function () {
      if (canvas) {
        canvasContext.current = canvas.getContext("2d") as unknown as CanvasRenderingContext2D
        canvasContext.current.drawImage(img, 0, 0, img.width, img.height)
      }
    }
  };

  return (
    <>
      <div className="bg-primary text-primary-foreground pl-1 pr-1 flex justify-between demo">
        <p>Hello</p>
        <p>ui-21</p>
        <p>{userInfo?.avatar}</p>
      </div>
      <IMG src={userInfo?.avatar || ""} wrapperClassName={"img-wrapper"} />
      <IMG src={imageURL} width={800} />
      <Button onClick={handleClick}>query</Button>
      <Button onClick={handleImgClick}>query</Button>
      <canvas ref={canvasRef} width={800} height={600} />
    </>
  );
}
export default ShadcnPage;
