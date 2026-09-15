import Counter from "../components/Counter";

const respone = await fetch("http://localhost:2202/");
const data = await respone.text();

export default function TaskPage() {
  return (
    <>
      <h1>{data}</h1>
      <Counter />
    </>
  );
}
