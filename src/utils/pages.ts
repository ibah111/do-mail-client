import React from 'react';
import { Action, AppAbility, Subject } from '../casl/casl.factory';
const Main = React.lazy(() => import('../Pages/Main'));
const Incoming = React.lazy(() => import('../Pages/Incoming'));
const Admin = React.lazy(() => import('../Pages/Admin'));
const Remove = React.lazy(() => import('../Pages/Remove'));

export interface Page {
  name: string;
  path: string;
  right: Action;
  subject: Subject;
  element: React.LazyExoticComponent<() => JSX.Element>;
}
type Pages = Page[];
export const usePages = (ability: AppAbility): Pages => [
  {
    name: 'Главная',
    path: '/',
    right: Action.Read,
    subject: Subject.Main,
    element: Main,
  },
  {
    name: 'Входящая почта',
    path: '/incoming',
    right: Action.Read,
    subject: Subject.DataIncoming,
    element: Incoming,
  },
  {
    name: 'Админ',
    path: '/admin',
    right: Action.Read,
    subject: Subject.Role,
    element: Admin,
  },
  {
    name: 'Удаление',
    path: '/remove',
    right: Action.Delete,
    subject: Subject.DataIncoming,
    element: Remove,
  },
];
