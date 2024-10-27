import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: "",
      todos: ["Just some demo tasks", "As an example"]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleInputChange(e) {
    this.setState(state => ({
      ...state,
      inputVal: e.target.value,
    }))
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState(state => ({
      ...state,
      todos: [...this.state.todos, this.state.inputVal],
      inputVal: "",
    }));
  };

  handleDelete(todo) {
    this.setState(state => ({
      ...state,
      todos: this.state.todos.filter(curTodo => curTodo != todo),
    }))
  }

  handleUpdate(updatedTodo, oldTodo) {
    this.setState(state => ({
      ...state,
      todos: this.state.todos.map(curTodo => curTodo == oldTodo ? updatedTodo : curTodo),
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Count count={this.state.todos.length} />
        <ul>
          {this.state.todos.map((todo) => (
            <Todo key={todo} todo={todo} handleDelete={() => this.handleDelete(todo)} handleUpdate={(updatedTodo) => this.handleUpdate(updatedTodo, todo)} />
          ))}
        </ul>
      </section>
    );
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      inputVal: this.props.todo,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState(state => ({
      ...state,
      inputVal: e.target.value,
    }))
  }

  handleResubmit(e) {
    this.props.handleUpdate(this.state.inputVal);
    
    this.setState(state => ({
      ...state,
      isEdit: false,
      inputVal: "",
    }))
  }

  handleEdit(e) {
    this.setState(state => ({
      ...state,
      isEdit: !this.state.isEdit,
    }))
  }

  render() {
    return (
      <li>
        {this.state.isEdit ? 
        <input type="text" value={this.state.inputVal} onChange={this.handleInputChange} />
        :
        <span>{this.props.todo}</span>}
        {" "}
        <input type="button" value="Delete" onClick={this.props.handleDelete} />
        {this.state.isEdit ?
        <input type="button" value="Resubmit" onClick={this.handleResubmit} />
        :
        <input type="button" value="Edit" onClick={this.handleEdit} />}
      </li>
    )
  }
}

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        Task Count: {this.props.count}
      </span>
    );
  }
}