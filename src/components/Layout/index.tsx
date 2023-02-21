import React from "react";
import { Menubar } from "primereact/menubar";
import { MenuItem, MenuItemCommandEvent } from "primereact/menuitem";
import { Outlet, useNavigate } from "react-router-dom";
import ToastWrapper from "./toast";

export default function Header() {
  const [index, setIndex] = React.useState(0);
  const navigate = useNavigate();

  const command = (event: MenuItemCommandEvent) => {
    if (event.item.id) {
      navigate(event.item.id);
    }
  };

  const items: MenuItem[] = [
    {
      label: "Главная",
      icon: "pi pi-fw pi-home",
      id: "/",
      command,
    },
    {
      label: "Кафедра",
      icon: "pi pi-fw pi-sitemap",
      id: "/cathedra",
      command,
    },
    {
      label: "Преподаватели",
      icon: "pi pi-fw pi-user",
      id: "/teachers",
      command,
    },
    {
      label: "Студенты",
      icon: "pi pi-fw pi-users",
      id: "/students",
      items: [
        {
          label: "Группы",
          icon: "pi pi-fw pi-book",
          id: "/students/groups",
          command,
        },
      ],
    },
    { label: "Занятия", icon: "pi pi-fw pi-table", id: "/schedule", command },
    { label: "Настройки", icon: "pi pi-fw pi-cog", id: "/settings", command },
  ];

  return (
    <>
      <Menubar model={items} className="header" />
      <Outlet />
      <ToastWrapper />
    </>
  );
}
