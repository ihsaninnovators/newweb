export default function StatCounter({ value, suffix = "" }) {
  return <span>{value.toLocaleString()}{suffix}</span>;
}