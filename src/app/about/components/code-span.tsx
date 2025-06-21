interface CodeSpanProps {
  children: React.ReactNode
}

const CodeSpan: React.FC<CodeSpanProps> = ({ children }) => (
  <span className="relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm">
    {children}
  </span>
)

export default CodeSpan
