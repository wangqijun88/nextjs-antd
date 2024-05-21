"use client";
import React from 'react'
import Menu from '../menu'
import './layout.css'
export default function Layout({ children }) {
  return (
    <div className='layout '>
      <div className='page-inner flex h-2.5 pr-1'>
        <div className='page-left'>
          <Menu />
        </div>
        <div className='page-right'>
          {children}
        </div>
      </div>
    </div>
  )
}