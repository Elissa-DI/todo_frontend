import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddTodoModal from "./addTodoModal";

const TodoHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <h1 className="text-lg font-semibold">Todo List</h1>
        <button
          onClick={handleModalOpen}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
          <FaPlus />
        </button>
      </div>
      {isModalOpen && <AddTodoModal onClose={handleModalClose} />}
    </>
  );
};

export default TodoHeader;
