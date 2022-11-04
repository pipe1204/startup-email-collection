import { fireEvent, render } from '@testing-library/react';
import {describe, expect, test} from 'vitest';
import Main from './components/main/Main'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'


describe('Homepage elements render correctly', () => {
    test('request title correctly', () => {
        const {getByText} = render(<Main />)
        const textElement = getByText('A better way to enjoy everyday')
        expect(textElement).toBeInTheDocument()
    })

    test('request an invite button renders correctly', () => {
        const {getByText} = render(<Main />)
        const buttonElement = getByText(/request an invite/i, { selector: 'button' })
        expect(buttonElement).toBeInTheDocument()
    })
})

describe('Form elements render correctly', () => {
    test('Full name input should be in the document', () => {
        const {getByPlaceholderText} = render(<Main />)
        const fullNameInputElement = getByPlaceholderText('Full Name...')
        expect(fullNameInputElement).toBeInTheDocument()
    })

    test('Email input should be in the document', () => {
        const {getByPlaceholderText} = render(<Main />)
        const emailInputElement = getByPlaceholderText('Email address...')
        expect(emailInputElement).toBeInTheDocument()
    })

    test('Confirm email input should be in the document', () => {
        const {getByPlaceholderText} = render(<Main />)
        const confirmEmailInputElement = getByPlaceholderText('Confirm email address...')
        expect(confirmEmailInputElement).toBeInTheDocument()
    })

    test('Send button should be disable', () => {
        const {getByText} = render(<Main />)
        const buttonElement = getByText(/send now/i, { selector: 'button' })
        expect(buttonElement).toBeDisabled()
    })

    test('Name error message should be not visible', () => {
        const {getByTestId} = render(<Main />)
        const errorElements = getByTestId("error")
        expect(errorElements).not.toBeVisible()
    })

    test('Name input should contain 3 or more letters', () => {
        const {getByPlaceholderText} = render(<Main />)
        const fullNameInputElement = getByPlaceholderText('Full Name...') as HTMLInputElement
        const name = 'test'

        fireEvent.change(fullNameInputElement, {target: { value: name }})
        expect(fullNameInputElement.value.length).toBeGreaterThanOrEqual(3)
    })

    test('Email and Confirm email input fields should match', () => {
        const {getByPlaceholderText} = render(<Main />)
        const emailInputElement = getByPlaceholderText('Email address...') as HTMLInputElement
        const confirmEmailInputElement = getByPlaceholderText('Confirm email address...') as HTMLInputElement

        const testEmail = "test@mail.com"
        const testConfirmEmail = "test@mail.com"

        fireEvent.change(emailInputElement, {target: { value: testEmail }})
        fireEvent.change(confirmEmailInputElement, {target: { value: testConfirmEmail }})
        expect(emailInputElement.value).toMatch(confirmEmailInputElement.value)
    })
})