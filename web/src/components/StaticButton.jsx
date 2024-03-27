export default function StaticButton({ text, className, onClick }) {
  return <button className={className + ' floating'} onClick={onClick}>{text}</button>;
}
