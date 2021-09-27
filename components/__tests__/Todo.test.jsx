import React from 'react'
import { render, screen,fireEvent } from '@testing-library/react'
import Todo from '../Todo'
import '@testing-library/jest-dom'



describe('Todo component',()=>{
  
const addTask= tasks=>{
  const Addinput = screen.getByPlaceholderText(/Add a new/i);
  const submitBtn= screen.getByRole('button', {name: 'Add'})

  tasks.forEach(todo=>{
    fireEvent.change( Addinput,{target: {value:todo}})
    fireEvent.click(submitBtn)
  })
} 

  test('integrate input compontent with todo component', ()=>{
        render(
        <Todo/>);
        const todo = ['learn react native']
        addTask(todo)
        const item = screen.getByText(/learn react native/i)
        expect(item).toBeVisible()
      })


      test('Should render multiple item', ()=>{
        render(
        <Todo/>);
        const todo = ['learn react native', 'learn cypress', 'learn data structure & algorithm']
        addTask(todo)
        const item = screen.getAllByTestId('task')
        expect(item).toHaveLength(3)
      })

      test('task should not have class completed when intially rendered', ()=>{
        render(
        <Todo/>);
        const todo = ['learn react native']
        addTask(todo)
        const item = screen.getByText(/learn react native/i)
        expect(item).not.toHaveClass('todo-item-active')
      })

      test('task should have class completed when clicked', ()=>{
        render(
        <Todo/>);
        const todo = ['learn react native']
        addTask(todo)
        const item = screen.getByText(/learn react native/i)
        fireEvent.click(item)
        expect(item).toHaveClass('todo-item-active')
      })

    }
    )