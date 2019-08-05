
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TodoWithID } from '../todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent  {

  @Input() todos: Array<TodoWithID>;
  @Output() toggleTodo = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();

  onTodoToggle(event, id, newValue) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleTodo.emit({
      id,
      done: newValue,
    });
  }

  onDelete(id) {
    this.deleteTodo.emit(id);
  }

}
