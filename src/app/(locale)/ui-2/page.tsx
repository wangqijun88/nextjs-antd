//"use client";
import { Button } from "antd";
import "./page.css";
export default function ShadcnPage() {
  const handleClick = () => {
    console.log(1);
  };
  return (
    <>
      <div className="bg-primary text-primary-foreground pl-1 pr-1 flex justify-between demo">
        <p>Hello</p>
        <p>ui-2</p>
      </div>
      <Button>266666666666</Button>
    </>
  );
}
