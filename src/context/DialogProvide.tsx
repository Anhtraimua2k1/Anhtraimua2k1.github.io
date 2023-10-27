import React, { createContext, useContext } from 'react'

interface DialogContextType {
  setDialogSize: (value: string) => void
  setDialogShow: (status: boolean) => void
  setDialogContent: (content: React.JSX.Element) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

interface DialogProviderProps {
  children: React.ReactNode
  props: DialogContextType
}

export const DialogProvider: React.FC<DialogProviderProps> = ({
  children,
  props,
}) => {
  const setDialogSize = (value: string) => props.setDialogSize(value)
  const setDialogShow = (status: boolean) => props.setDialogShow(status)
  const setDialogContent = (customElement: React.JSX.Element) =>
    props.setDialogContent(customElement)

  return (
    <DialogContext.Provider
      value={{ setDialogSize, setDialogShow, setDialogContent }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within an DialogProvider')
  }
  return context
}
