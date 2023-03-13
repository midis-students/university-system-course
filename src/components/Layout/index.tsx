import { Menubar } from 'primereact/menubar';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { Outlet, useNavigate } from 'react-router-dom';
import ToastWrapper from './toast';

export default function Header() {
  const navigate = useNavigate();

  const command = (event: MenuItemCommandEvent) => {
    if (event.item.id) {
      navigate(event.item.id);
    }
  };

  const items: MenuItem[] = [
    {
      label: 'Главная',
      icon: 'pi pi-fw pi-home',
      id: '/',
      command,
    },
    {
      label: 'Кафедра',
      icon: 'pi pi-fw pi-sitemap',
      id: '/cathedras',
      command,
    },
    {
      label: 'Преподаватели',
      icon: 'pi pi-fw pi-user',
      id: '/teachers',
      items: [
        {
          label: 'Список',
          icon: 'pi pi-fw pi-user',
          id: '/teachers',
          command,
        },
        {
          label: 'Добавить',
          icon: 'pi pi-fw pi-user',
          id: '/teachers/add',
          command,
        },
      ],
    },
    {
      label: 'Студенты',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Группы',
          icon: 'pi pi-fw pi-book',
          id: '/groups',
          command,
        },
        {
          label: 'Список',
          icon: 'pi pi-fw pi-users',
          id: '/students',
          command,
        },
      ],
    },
    {
      label: 'Занятия',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'Список',
          icon: 'pi pi-fw pi-table',
          id: '/schedule',
          command,
        },
        {
          label: 'Проведенные занятия',
          icon: 'pi pi-fw pi-table',
          id: '/schedule/lesson-passed',
          command,
        },
        {
          label: 'Дисциплины',
          icon: 'pi pi-fw pi-book',
          id: '/schedule/discipline',
          command,
        },
        {
          label: 'Семестры',
          icon: 'pi pi-fw pi-book',
          id: '/schedule/semester',
          command,
        },
        {
          label: 'Формы контроля',
          icon: 'pi pi-fw pi-book',
          id: '/schedule/form-of-control',
          command,
        },
        {
          label: 'Сессия',
          icon: 'pi pi-fw pi-book',
          id: '/schedule/session',
          command,
        },
        {
          label: 'Результаты',
          icon: 'pi pi-fw pi-book',
          id: '/schedule/session-result',
          command,
        },
      ],
    },
    { label: 'Настройки', icon: 'pi pi-fw pi-cog', id: '/settings', command },
  ];

  return (
    <>
      <Menubar model={items} className="header" />
      <main className="overflow-y-auto h-screen m-0 p-4">
        <Outlet />
      </main>
      <ToastWrapper />
    </>
  );
}
