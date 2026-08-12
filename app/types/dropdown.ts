export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps {
  value: string
  options: DropdownOption[]
  label?: string
  block?: boolean
}

export interface DropdownEmits {
  change: [value: string]
}
