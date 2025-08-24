import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import customRender from '@/test-utils/test-utils';
import UncontrolledForm from '@/components/UncontrolledForm';
import { defaultFormData, incorrectTestData } from '@/data/data';
import { store } from '@/app/store';
import { Provider } from 'react-redux';

describe('Uncontrolled form', () => {
  it('renders form', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    expect(screen.getByTestId('uncontrolled-form')).toBeVisible();
  });
  it('checks availability of all required fields', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
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
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/name/i);
    await userEvent.click(submit);
    await userEvent.type(input, 'alice');
    await userEvent.click(submit);
    expect(
      screen.getByText('First letter of name must be uppercased')
    ).toBeVisible();
    await userEvent.clear(input);
    await userEvent.click(submit);
    expect(screen.getByText('Name is a required field')).toBeVisible();
    await userEvent.type(input, 'Alice');
    await userEvent.click(submit);
    expect(
      screen.queryByText('First letter of name must be uppercased')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Name is a required field')
    ).not.toBeInTheDocument();
  });
  it('validates age correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/age/i);
    await userEvent.type(input, '-1');
    await userEvent.click(submit);
    screen.getByText('Age must be positive');
    expect(screen.getByText('Age must be positive')).toBeVisible();
    await userEvent.clear(input);
    await userEvent.click(submit);
    expect(screen.getByText('Age is a required field')).toBeVisible();
    await userEvent.type(input, '10');
    await userEvent.click(submit);
    expect(screen.queryByText('Age must be positive')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Age is a required field')
    ).not.toBeInTheDocument();
  });
  it('validates email correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/e-mail/i);
    await userEvent.type(input, 'denis');
    await userEvent.click(submit);
    expect(screen.getByText('Invalid email')).toBeVisible();
    await userEvent.clear(input);
    await userEvent.click(submit);
    expect(screen.getByText('Email is a required field')).toBeVisible();
    await userEvent.type(input, 'denis@gmail.com');
    await userEvent.click(submit);
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Email is a required field')
    ).not.toBeInTheDocument();
  });
  it('checks password strength', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/^password$/i);
    await userEvent.type(input, '1');
    await userEvent.click(submit);
    expect(screen.getByText('Weak')).toBeVisible();
    await userEvent.type(input, 'a');
    await userEvent.click(submit);
    expect(screen.getByText('Fair')).toBeVisible();
    await userEvent.type(input, 'A');
    await userEvent.click(submit);
    expect(screen.getByText('Good')).toBeVisible();
    await userEvent.type(input, '$');
    await userEvent.click(submit);
    expect(screen.getByText('Strong')).toBeVisible();
    await userEvent.clear(input);
    expect(screen.queryByTestId('Weak')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Fair')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Good')).not.toBeInTheDocument();
    expect(screen.queryByTestId('Strong')).not.toBeInTheDocument();
  });
  it('validates password correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/^password$/i);
    await userEvent.type(input, 'а');
    await userEvent.click(submit);
    expect(screen.getByText('Password must contain one digit')).toBeVisible();
    await userEvent.type(input, '1');
    await userEvent.click(submit);

    expect(
      screen.getByText('Password must contain one lowercase letter')
    ).toBeVisible();
    await userEvent.type(input, 'a');
    await userEvent.click(submit);
    expect(
      screen.getByText('Password must contain one uppercase letter')
    ).toBeVisible();
    await userEvent.clear(input);
    await userEvent.click(submit);
    expect(screen.getByText('Password is a required field')).toBeVisible();
    await userEvent.type(input, 'aA1');
    await userEvent.click(submit);
    const oneSpecialCharacterError = screen.getByText(
      'Password must contain one special character'
    );
    expect(oneSpecialCharacterError).toBeVisible();
    await userEvent.type(input, '$');
    await userEvent.click(submit);
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
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const passwordInput = screen.getByLabelText(/^password$/i);
    await userEvent.type(passwordInput, 'A');
    await userEvent.click(submit);
    const confirmPasswordInput = screen.getByLabelText(/^confirm password$/i);
    await userEvent.type(confirmPasswordInput, 'B');
    await userEvent.click(submit);
    expect(screen.getByText("Passwords don't match")).toBeVisible();
    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'A');
    await userEvent.click(submit);
    expect(screen.queryByText("Passwords don't match")).not.toBeInTheDocument();
  });
  it('validates select gender correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);
    expect(screen.getByText('Select gender')).toBeVisible();
    const input = screen.getByLabelText(/^male$/i);
    await userEvent.click(input);
    await userEvent.click(submit);
    expect(screen.queryByText('Select gender')).not.toBeInTheDocument();
  });
  it('validates accept terms correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/accept t&c/i);
    await userEvent.click(input);
    await userEvent.click(input);
    await userEvent.click(submit);
    expect(screen.getByText('Accept terms')).toBeVisible();
    await userEvent.click(input);
    await userEvent.click(submit);
    expect(screen.queryByText('Accept terms')).not.toBeInTheDocument();
  });

  it('validates country correctly', async () => {
    const onSuccessMock = vi.fn();
    customRender(<UncontrolledForm onSuccess={onSuccessMock} />);
    const submit = screen.getByRole('button', { name: 'Submit' });
    const input = screen.getByLabelText(/country/i);
    await userEvent.type(input, 'Albania');
    await userEvent.clear(input);
    await userEvent.click(submit);
    expect(screen.getByText('Choose country')).toBeVisible();
    await userEvent.type(input, 'Albania');
    await userEvent.click(submit);
    expect(screen.queryByText('Choose country')).not.toBeInTheDocument();
  });
  it('submits invalid data', async () => {
    const onSuccessMock = vi.fn();

    render(
      <Provider store={store}>
        <UncontrolledForm onSuccess={onSuccessMock} />
      </Provider>
    );
    const button = await screen.findByRole('button', { name: 'Submit' });
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
    const name = screen.getByLabelText(/name/i);
    await userEvent.type(name, incorrectTestData.name);
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
    await userEvent.type(
      screen.getByLabelText(/age/i),
      incorrectTestData.age.toString()
    );
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );

    await userEvent.type(
      screen.getByLabelText(/e-mail/i),
      incorrectTestData.email
    );
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
    await userEvent.type(
      screen.getByLabelText(/^password$/i),
      incorrectTestData.password
    );
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );

    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      incorrectTestData.confirmPassword
    );
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
    await userEvent.click(screen.getByLabelText(/accept t&c/i));
    await userEvent.click(screen.getByLabelText(/accept t&c/i));
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
    await userEvent.upload(
      screen.getByLabelText(/picture/i),
      new File(['some text'], 'picture.svg', { type: 'image/svg' })
    );
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
    await userEvent.type(
      screen.getByLabelText(/^country$/i),
      incorrectTestData.country
    );
    await userEvent.click(button);
    expect(store.getState().forms.uncontrolledFormData).toEqual(
      defaultFormData
    );
  });
});
