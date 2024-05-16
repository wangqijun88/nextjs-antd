"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
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
const URL_CONFIG: UrlConfig = {
  "11": "/ui",
  "12": "/ui-1",
  "13": "/ui-2",
};

const items: MenuItem[] = [
  getItem(
    "Navigation One",
    "1",
    <MailOutlined />,
    [
      getItem("Option 1", "11"),
      getItem("Option 2", "12"),
      getItem("Option 3", "13"),
      getItem("Option 4", "14"),
    ],
    "/items"
  ),
  getItem("Navigation Two", "2", <AppstoreOutlined />, [
    getItem("Option 1", "21"),
    getItem("Option 2", "22"),
    getItem("Submenu", "23", null, [
      getItem("Option 1", "231"),
      getItem("Option 2", "232"),
      getItem("Option 3", "233"),
    ]),
    getItem("Submenu 2", "24", null, [
      getItem("Option 1", "241"),
      getItem("Option 2", "242"),
      getItem("Option 3", "243"),
    ]),
  ]),
  getItem("Navigation Three", "3", <SettingOutlined />, [
    getItem("Option 1", "31"),
    getItem("Option 2", "32"),
    getItem("Option 3", "33"),
    getItem("Option 4", "34"),
  ]),
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

const App: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["1"]);
  const route = useRouter();
  useEffect(() => {
    console.log("stateOpenKeys", stateOpenKeys);
  }, [stateOpenKeys]);

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
      defaultSelectedKeys={["11"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
      onClick={onMenuClick}
    />
  );
};

export default App;
