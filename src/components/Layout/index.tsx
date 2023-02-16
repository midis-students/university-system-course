import React from "react";
import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { Outlet, useNavigate } from "react-router-dom";
import ToastWrapper from "./toast";

export default function Header() {
  const [index, setIndex] = React.useState(0);
  const navigate = useNavigate();

  const items = [
    { label: "Главная", icon: "pi pi-fw pi-home", path: "/" },
    { label: "Преподаватели", icon: "pi pi-fw pi-user", path: "/teachers" },
    { label: "Студенты", icon: "pi pi-fw pi-users", path: "/students" },
    { label: "Занятия", icon: "pi pi-fw pi-table", path: "/schedule" },
    { label: "Настройки", icon: "pi pi-fw pi-cog", path: "/settings" },
  ];

  const onClick = (e: TabMenuTabChangeEvent) => {
    setIndex(e.index);
    navigate(items[e.index].path);
  };

  return (
    <>
      <TabMenu
        model={items}
        className="header"
        activeIndex={index}
        onTabChange={onClick}
      />
      <Outlet />
      <ToastWrapper />
    </>
  );
}
