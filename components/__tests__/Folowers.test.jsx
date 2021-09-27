import React from 'react'
import { render, screen,fireEvent } from '@testing-library/react'
import Followers from '../Followers'
import '@testing-library/jest-dom'



describe('Followes Component Test',()=>{

    test('should render Follower Div Element ', async ()=>{
        render(<Followers/>)
        const FollowerDivElement = await screen.findByTestId('follower-item-0');

        expect(FollowerDivElement).toBeVisible()
    })

    // test('should render mutiple follower  ', async ()=>{
    //     render(<Followers/>)
    //     const FollowerDivElement = await screen.findAllByTestId(/follower-item/i);

    //     expect(FollowerDivElement).toHaveLength(5)
    // })
})