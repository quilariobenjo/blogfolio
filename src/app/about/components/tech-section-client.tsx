"use client"

import * as React from "react"
import Tech from "@/components/tech"
import SkillSetDialog from "@/components/skill-set-dialog"

interface TechSectionClientProps {
  className?: string
}

const TechSectionClient = ({ className }: TechSectionClientProps) => {
  const [isSkillDialogOpen, setIsSkillDialogOpen] = React.useState(false)

  const handleShowFullSkills = React.useCallback(() => {
    setIsSkillDialogOpen(true)
  }, [])

  const handleCloseSkillDialog = React.useCallback((open: boolean) => {
    setIsSkillDialogOpen(open)
  }, [])

  return (
    <>
      <SkillSetDialog
        open={isSkillDialogOpen}
        onOpenChange={handleCloseSkillDialog}
      />
      <div className={className}>
        <Tech onShowFullSkills={handleShowFullSkills} />
      </div>
    </>
  )
}

export default TechSectionClient
