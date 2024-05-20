"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Link from 'next/link';
import {
  DashboardOutlined,
  TeamOutlined,
  LoginOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  //type?: "group",
  url?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    //type,
    url,
  } as MenuItem;
}

type UrlConfig = {
  [key: string]: string;
};

type RouteConfig = {
  key: string,
  curDefaultKeys: string
}

const URL_CONFIG: UrlConfig = {
  "1": '/',
  "21": "/ui",
  "22": "/ui-1",
  "23": "/ui-2",
  "3": '/fsad'
};

const items: MenuItem[] = [
  getItem("home", "1", <DashboardOutlined />),
  getItem("Family", "2", <TeamOutlined />, [
    getItem("Member", "21"),
    getItem("Important note", "22"),
    getItem("Multimedia", "23"),
  ]),
  getItem("Other", "3", <LoginOutlined />),
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}
const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const getDefaultkey = (currentPath: string) => {
  let key: string = Object.keys(URL_CONFIG).filter(item => URL_CONFIG[item] === currentPath)[0] || '1'
  const curDefaultKeys: string = key.split('')[0]
  return { key, curDefaultKeys }
}
const App: React.FC = () => {
  const currentPath = usePathname()
  const routeInfo: RouteConfig = getDefaultkey(currentPath)
  const [stateOpenKeys, setStateOpenKeys] = useState([routeInfo.curDefaultKeys])
  const [defaultKeys, setDefaultKeys] = useState([routeInfo.key])
  const route = useRouter();


  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const onMenuClick: MenuProps["onClick"] = (keyObj: any) => {
    const url = URL_CONFIG[keyObj.key];
    route.push(url)
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={defaultKeys}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
      onClick={onMenuClick}
    />
  );
};

export default App;
