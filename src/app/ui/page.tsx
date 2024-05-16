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
        <p>Next-ui-1</p>
      </div>
      <Button type="primary" className='primary-button'>Primary Button</Button>
    </>
  );
}
