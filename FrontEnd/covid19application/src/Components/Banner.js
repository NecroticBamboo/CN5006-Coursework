export function Banner(props) {
  if (!props.show) {
    return null;
  }

  return (
	<div class="alert alert-success m-3" role="alert">{props.text}</div>
  );
}
