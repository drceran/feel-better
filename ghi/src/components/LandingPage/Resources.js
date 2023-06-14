import ResourcesList from "../Resources/ResourcesList";

export default function Resource({back}) {
return (
  <div style={{ fontFamily: "Short Stack, cursive" }}>
    <button
      onClick={back}>back</button>
  <ResourcesList />
  </div>
)
}
