import "./App.css";
import { useState } from "react";
import List from "./component/List";
import { v4 as uuidv4 } from "uuid";
import Alert from "./component/Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [checkList, setCheckList] = useState(false);
  const [editId, setEditId] = useState("");
  const submitData = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({
        show: true,
        msg: "Please input some information.",
        type: "error",
      });
    } else if (checkList && name) {
      const result = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(result);
      setName("");
      setCheckList(false);
      setEditId(null);
      setAlert({
        show: true,
        msg: "Edit!",
        type: "success",
      });
    } else {
      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList([newItem, ...list]);
      setName("");

      setAlert({
        show: true,
        msg: "Save!",
        type: "success",
      });
    }
  };

  const removeItem = (id) => {
    const result = list.filter((item) => item.id !== id);
    setList(result);
    setAlert({
      show: true,
      msg: "Remove!",
      type: "error",
    });
    setCheckList(false);
    setEditId(null);
    setName("");
  };

  const editItem = (id) => {
    setCheckList(true);
    setEditId(id);
    const searchItem = list.find((item) => item.id === id);
    setName(searchItem.title);
  };

  return (
    <section className="container">
      <h1>TodoList App</h1>

      <form className="form-group" onSubmit={submitData}>
        <div className="form-control">
          <input
            type="text"
            className="text-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className="submit-btn">
            {checkList ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <section className="list-container">
        {list.map((data, index) => {
          return (
            <List
              key={index}
              {...data}
              removeItem={removeItem}
              editItem={editItem}
            />
          );
        })}
      </section>
    </section>
  );
}

export default App;
