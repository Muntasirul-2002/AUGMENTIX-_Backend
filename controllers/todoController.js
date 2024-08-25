import { Todo } from "../model/todoListModel.js";

//get all the todo lists
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//upload a new todo
export const createTodo = async (req, res) => {
  const { text } = req.body;

  const newTodo = new Todo({
    text,
  });

  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update a toto using id
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a todo using id
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
