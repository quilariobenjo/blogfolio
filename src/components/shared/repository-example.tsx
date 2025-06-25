import { Repository } from "./repositories"

// Example usage of the Repository component
export const RepositoryExamples = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Repository Examples</h2>

      <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {/* Public repository with full details */}
        <Repository
          name="public-project"
          description="A fully featured public repository with external links and comprehensive details."
          isPrivate={false}
          language="TypeScript"
          stars={42}
          forks={8}
          topics={["react", "nextjs", "typescript", "tailwind"]}
          hasExternalLink={true}
        />

        {/* Private repository */}
        <Repository
          name="private-client-work"
          description="Confidential client project with proprietary code and sensitive business logic."
          isPrivate={true}
          language="JavaScript"
          stars={0}
          forks={0}
          topics={["vue", "nuxt", "private", "client-work"]}
          hasExternalLink={false}
        />

        {/* Repository without external link */}
        <Repository
          name="internal-tool"
          description="Internal development tool used for team productivity. No public deployment available."
          isPrivate={false}
          language="Python"
          stars={15}
          forks={3}
          topics={["python", "automation", "internal"]}
          hasExternalLink={false}
        />

        {/* Minimal repository */}
        <Repository
          name="experiment"
          description="Quick experimental project for testing new ideas and concepts."
          isPrivate={false}
          language="Go"
          stars={2}
          forks={0}
          topics={["experiment", "proof-of-concept"]}
          hasExternalLink={false}
        />
      </ul>
    </div>
  )
}
