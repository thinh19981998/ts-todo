import React, { useRef } from 'react';
import './styles.css';

type Props = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
};

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter task"
        className="input__box"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button className="input__submit">Go</button>
    </form>
  );
};

export default InputField;
