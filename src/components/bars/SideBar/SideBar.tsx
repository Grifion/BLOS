import React from 'react';
import './SideBar.scss';
import { AddTask } from '../../buttons/AddTask/AddTask';

type Props = {
	board: boolean,
}

export const SideBar: React.FC<Props> = ({ board }) => (
  <nav className="nav">
    {board && <AddTask />}
    {board && <AddTask />}
    {board && <AddTask />}
    {board && <AddTask />}
    {board && <AddTask />}
  </nav>
);