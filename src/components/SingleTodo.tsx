import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { icons } from '../assets/icons';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, setTodos, index }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  const handleEdit = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEditing(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <form
            className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {isEditing ? (
              <input
                type="text"
                value={editTodo}
                className="todos__single--text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target?.value)}
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="todos__single--text">{todo.todo}</s>
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )}
            <div>
              <span className="icon">
                <img src={icons.check} alt="complete" onClick={() => handleDone(todo.id)} />
              </span>
              <span className="icon">
                <img
                  src={icons.edit}
                  alt="edit"
                  onClick={() => {
                    if (!isEditing && !todo.isDone) {
                      setIsEditing(true);
                    }
                  }}
                />
              </span>
              <span className="icon">
                <img src={icons.delete} alt="delete" onClick={() => handleDelete(todo.id)} />
              </span>
            </div>
          </form>
        );
      }}
    </Draggable>
  );
};

export default SingleTodo;
