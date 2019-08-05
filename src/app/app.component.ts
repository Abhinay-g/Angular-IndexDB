import { Component, OnInit } from '@angular/core';
import { TodoWithID, Todo, TodosService } from './todos.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todosList: Array<TodoWithID> = [];
  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getAll().then((todos: Array<any>) => {
      // // this.todosList = todos;
      // todos.forEach(e => {
      //   console.log(e as Todo);
      // });
      console.log(todos);

    });
    // console.log(this.ti);

  }

  onAddTodo(title: string) {
    const todo: Todo = {
      title,
      done: false,
    };
    this.todosService
      .add(todo)
      .then((id) => {
        this.todosList = [...this.todosList, Object.assign({}, todo, { id })];
        console.log(this.todosList);
      });
  }
  onToggleTodo({ id, done }: { id: number, done: boolean }) {
    this.todosService
      .update(id, { done })
      .then(() => {
        const todoToUpdate = this.todosList.find((todo) => todo.id === id);
        this.todosList = [...this.todosList.filter((todo) => todo.id !== id), Object.assign({}, todoToUpdate, { done })];
        // console.log(this.todosList);

      });
  }

  onDeleteTodo(id: number) {
    this.todosService
      .remove(id)
      .then(() => {
        this.todosList = this.todosList.filter((todo) => todo.id !== id);
      });
  }
}
