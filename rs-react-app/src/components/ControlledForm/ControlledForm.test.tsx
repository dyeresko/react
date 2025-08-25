import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import customRender from '@/test-utils/test-utils';
import ControlledForm from '@/components/ControlledForm';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { testData } from '@/data/data';
import { toBase64 } from '@/utils/utils';

describe('Controlled form', () => {
  it('renders form', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    expect(screen.getByTestId('controlled-form')).toBeVisible();
  });
  it('checks availability of all required fields', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    expect(screen.getByLabelText(/name/i)).toBeVisible();
    expect(screen.getByLabelText(/age/i)).toBeVisible();
    expect(screen.getByLabelText(/e-mail/i)).toBeVisible();
    expect(screen.getByLabelText(/^password$/i)).toBeVisible();
    expect(screen.getByLabelText(/confirm password/i)).toBeVisible();
    expect(screen.getByLabelText(/^male$/i)).toBeVisible();
    expect(screen.getByLabelText(/female/i)).toBeVisible();
    expect(screen.getByLabelText(/accept t&c/i)).toBeVisible();
    expect(screen.getByLabelText(/picture/i)).toBeVisible();
    expect(screen.getByLabelText(/country/i)).toBeVisible();
  });
  it('validates name correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/name/i);
    await userEvent.type(input, 'alice');
    const firstLetterErrorMessage = screen.getByText(
      'First letter of name must be uppercased'
    );
    expect(firstLetterErrorMessage).toBeVisible();
    await userEvent.clear(input);
    expect(screen.getByText('Name is a required field')).toBeVisible();
    await userEvent.type(input, 'Alice');
    expect(firstLetterErrorMessage).not.toBeVisible();
    expect(
      screen.queryByText('Name is a required field')
    ).not.toBeInTheDocument();
  });
  it('validates age correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/age/i);
    await userEvent.type(input, '-1');
    expect(screen.getByText('Age must be positive')).toBeVisible();
    await userEvent.clear(input);
    expect(screen.getByText('Age is a required field')).toBeVisible();
    await userEvent.type(input, '10');
    expect(screen.queryByText('Age must be positive')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Age is a required field')
    ).not.toBeInTheDocument();
  });
  it('validates email correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/e-mail/i);
    await userEvent.type(input, 'denis');
    expect(screen.getByText('Invalid email')).toBeVisible();
    await userEvent.clear(input);
    expect(screen.getByText('Email is a required field')).toBeVisible();
    await userEvent.type(input, 'denis@gmail.com');
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Email is a required field')
    ).not.toBeInTheDocument();
  });

  it('checks password strength', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/^password$/i);
    await userEvent.type(input, '1');
    expect(screen.getByText('Weak')).toBeVisible();
    expect(screen.getByTestId('progress-bar')).toBeVisible();
    await userEvent.type(input, 'a');
    expect(screen.getByText('Fair')).toBeVisible();
    expect(screen.getByTestId('progress-bar')).toBeVisible();
    await userEvent.type(input, 'A');
    expect(screen.getByText('Good')).toBeVisible();
    expect(screen.getByTestId('progress-bar')).toBeVisible();
    await userEvent.type(input, '$');
    expect(screen.getByText('Strong')).toBeVisible();
    expect(screen.getByTestId('progress-bar')).toBeVisible();
    await userEvent.clear(input);
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Weak')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Fair')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Good')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Strong')).not.toBeInTheDocument();
  });

  it('validates password correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/^password$/i);
    await userEvent.type(input, 'а');

    expect(screen.getByText('Password must contain one digit')).toBeVisible();
    await userEvent.type(input, '1');
    expect(
      screen.getByText('Password must contain one lowercase letter')
    ).toBeVisible();
    await userEvent.type(input, 'a');
    expect(
      screen.getByText('Password must contain one uppercase letter')
    ).toBeVisible();
    await userEvent.clear(input);
    expect(screen.getByText('Password is a required field')).toBeVisible();
    await userEvent.type(input, 'aA1');
    const oneSpecialCharacterError = screen.getByText(
      'Password must contain one special character'
    );
    expect(oneSpecialCharacterError).toBeVisible();
    await userEvent.type(input, '$');
    expect(oneSpecialCharacterError).not.toBeVisible();
    expect(
      screen.queryByText('Password must contain one digit')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Password must contain one lowercase letter')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Password must contain one uppercase letter')
    ).not.toBeInTheDocument();
  });
  it('validates confirm password correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const passwordInput = screen.getByLabelText(/^password$/i);
    await userEvent.type(passwordInput, 'A');
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);
    await userEvent.type(confirmPasswordInput, 'B');
    expect(screen.getByText("Passwords don't match")).toBeVisible();
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'A');
    expect(screen.queryByText("Passwords don't match")).not.toBeInTheDocument();
  });
  it('validates accept terms correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/accept t&c/i);
    await userEvent.click(input);
    await userEvent.click(input);
    screen.getByText('Accept terms');
    expect(screen.getByText('Accept terms')).toBeVisible();
    await userEvent.click(input);
    expect(screen.queryByText('Accept terms')).not.toBeInTheDocument();
  });

  it('validates country correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<ControlledForm onSuccess={onSuccessMock} />);
    const input = screen.getByLabelText(/country/i);
    await userEvent.type(input, 'Albania');
    await userEvent.clear(input);
    expect(screen.getByText('Choose country')).toBeVisible();
    await userEvent.type(input, 'Albania');
    expect(screen.queryByText('Choose country')).not.toBeInTheDocument();
  });
  it('submits invalid data', async () => {
    const onSuccessMock = vi.fn();

    customRender(<ControlledForm onSuccess={onSuccessMock} />);

    const button = await screen.findByRole('button', { name: 'Submit' });
    expect(button).toBeDisabled();

    const name = screen.getByLabelText(/name/i);
    await userEvent.type(name, 'alice');
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/age/i), '-1');
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'alice@');
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/^password$/i), '123');
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/confirm password/i), '1');
    expect(button).toBeDisabled();
    await userEvent.click(screen.getByLabelText(/accept t&c/i));
    await userEvent.click(screen.getByLabelText(/accept t&c/i));
    expect(button).toBeDisabled();
    await userEvent.upload(
      screen.getByLabelText(/picture/i),
      new File(['some text'], 'picture.svg', { type: 'image/svg' })
    );
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/^country$/i), '123');
    expect(button).toBeDisabled();
  });
  it('submits valid data', async () => {
    const onSuccessMock = vi.fn();
    render(
      <Provider store={store}>
        <ControlledForm onSuccess={onSuccessMock} />
      </Provider>
    );
    const button = await screen.findByRole('button', { name: 'Submit' });
    expect(button).toBeDisabled();
    const name = screen.getByLabelText(/name/i);
    await userEvent.type(name, testData.name);
    expect(button).toBeDisabled();
    await userEvent.type(
      screen.getByLabelText(/age/i),
      testData.age.toString()
    );
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/e-mail/i), testData.email);
    expect(button).toBeDisabled();
    await userEvent.type(
      screen.getByLabelText(/^password$/i),
      testData.password
    );
    expect(button).toBeDisabled();

    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      testData.confirmPassword
    );
    expect(button).toBeDisabled();
    await userEvent.click(screen.getByLabelText(/^female$/i));
    await userEvent.click(screen.getByLabelText(/accept t&c/i));
    expect(button).toBeDisabled();
    await userEvent.upload(screen.getByLabelText(/picture/i), testData.picture);
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/^country$/i), testData.country);
    expect(button).toBeEnabled();
    await userEvent.click(button);
    const state = store.getState();
    const convertedPicture = await toBase64(testData.picture);
    if (typeof convertedPicture === 'string') {
      expect(state.forms.controlledFormData).toEqual({
        name: testData.name,
        age: testData.age,
        email: testData.email,
        password: testData.password,
        confirmPassword: testData.confirmPassword,
        gender: testData.gender,
        accept: testData.accept,
        picture: convertedPicture,
        country: testData.country,
      });
    }
  });
});
