import React, { useState } from "react";
import { Checkbox } from "antd";
import { cn } from '@bem-react/classname';
import './todo-list.scss';

interface Todo {
  title: string;
  complete: boolean;
}

interface Props {
  data: {
    date: moment.Moment;
    todos: Todo[];
    fullComplete: boolean;
    procentComplete: number;
  };
  handleToggleComplete: () => void;
  handleChangeTodoTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cnTodoList = cn('TodoList');
const cnTodo = cn('Todo');

export const TodoList = (props: Props): JSX.Element => {
  const [todoTitle, setTodoTitle] = useState('asdfasdfadf');
  const [_complete, setComplete] = useState(false);
  const handleChangeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  }
  const { data, handleToggleComplete } = props;
  const todos = data.todos.map((todo, i) => {
    const { title, complete } = todo;
    return (
      <div key={i} className={cnTodo()}>
        <Checkbox id="todoComplete" defaultChecked={_complete} onChange={() => setComplete(!_complete)} />
        <input className={cnTodo('Input', { complete: _complete })} value={todoTitle} onChange={handleChangeTodoTitle}/>
      </div>
    );
  });

  return (
    <div className={cnTodoList()}>
      <h1>{data.date.format('YYYY-MM-DD')}</h1>
      {todos}
    </div>
  );
};
