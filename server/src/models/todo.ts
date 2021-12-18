import mongoose from "mongoose";

interface ITodo {
  title: string;
  description: string;
  isCompleted: boolean;
}

interface todoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
  isCompleted: boolean;
}

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

todoSchema.statics.build = (attr: ITodo) => {
  return new Todo(attr);
};
const Todo = mongoose.model<TodoDoc, todoModelInterface>("Todo", todoSchema);

export { Todo };
