function MyError(props: { error: boolean }) {
  if (props.error) {
    throw new Error('Something went wrong.');
  }
  return <div data-testid="error">{props.error}</div>;
}

export default MyError;
