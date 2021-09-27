import React from 'react'
import { render, screen,fireEvent } from '@testing-library/react'
import AddInput from '../AddInput'
import '@testing-library/jest-dom'


const mockedSetTodos= jest.fn()

describe('input',()=>{
  
  test('get Add Input', ()=>{
        render(
        <AddInput 
        todos={[]}
        setTodos={mockedSetTodos}
        />);
        const Addinput = screen.getByPlaceholderText(/Add a new/i);
        expect(Addinput).toBeVisible()
      
      })
  
  
  test('Can Type into Add Input', ()=>{
        render(
        <AddInput 
        todos={[]}
        setTodos={mockedSetTodos}
        />);
        const Addinput = screen.getByPlaceholderText(/Add a new/i);
        fireEvent.change( Addinput,{target: {value:'learning testing'}})
        expect(Addinput).toBeVisible()
        expect(Addinput.value).toBe('learning testing')
      
      })
  
  test('Can submit and input change to empty when submitBtn is click ', ()=>{
        render(
        <AddInput 
        todos={[]}
        setTodos={mockedSetTodos}
        />);
const Addinput = screen.getByPlaceholderText(/Add a new/i);
        const submitBtn= screen.getByRole('button', {name: 'Add'})
        
        fireEvent.click(submitBtn)
        expect(Addinput).toBeVisible()
        expect(submitBtn).toBeVisible()
        expect(Addinput.value).toBe('')
      
      })
})


// describe('testing', ()=>{

  //   test('inti test', ()=>{
  //     render(<Testing/>);
  //     const heading = screen.getByText(/heading/i);
  //     expect(heading).toBeVisible()
    
  //   })
    
  //   test('html contains', ()=>{
  //     render(<Testing/>);
  //     const heading = screen.getByText(/heading/i);
  //     expect(heading).toBeVisible()
    
  //   })
    
  //   test('html contains', ()=>{
  //     render(<Testing/>);
  //     const heading = screen.getByTestId('test');
  //     expect(heading.textContent).toBe('heading')
  //   })
    
  // })

