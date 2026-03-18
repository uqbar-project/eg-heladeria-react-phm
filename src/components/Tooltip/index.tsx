import { cloneElement, isValidElement, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import './tooltip.css'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

type Props = {
  content: React.ReactNode
  position?: TooltipPosition
  tooltipClassName?: string
  children: React.ReactNode
}

const supportsAnchorPositioning = typeof CSS !== 'undefined' && CSS.supports('anchor-name: --test')

// Safari tiene problemas con anchor positioning combinado con display: contents
const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

const isAnchorPositioningSupported = supportsAnchorPositioning && !isSafari

/**
 * Tooltip con CSS Anchor Positioning
 *
 * Limitaciones conocidas:
 * - Asume que children renderiza un elemento DOM (no texto plano ni fragments)
 * - En browsers sin soporte suficiente de anchor positioning, usa `title` nativo como fallback
 * - Safari se excluye explícitamente por problemas observados con esta implementación
 * - Optimizado para browsers modernos
 */
const Tooltip = ({ content, position = 'top', tooltipClassName, children }: Props) => {
  const uniqueId = useId()

  const sanitizedId = uniqueId.replace(/:/g, '')
  const anchorName = `--tooltip-${sanitizedId}`

  const isStringContent = typeof content === 'string' && content !== ''

  const shouldRenderTooltip = isStringContent || (isValidElement(content) && isAnchorPositioningSupported)

  if (!shouldRenderTooltip) {
    return <>{children}</>
  }

  if (isStringContent && !isAnchorPositioningSupported) {
    return (
      <span className='tooltip-trigger' title={content}>
        {children}
      </span>
    )
  }

  const childrenWithAnchorName = isValidElement<React.HTMLAttributes<HTMLElement>>(children)
    ? cloneElement(children, {
        style: { ...children.props.style, anchorName },
        'aria-describedby': anchorName,
      })
    : children

  return (
    <>
      <span className='tooltip-trigger'>{childrenWithAnchorName}</span>
      <span
        id={anchorName}
        role='tooltip'
        className={twMerge('tooltip-content', `tooltip-${position}`, tooltipClassName)}
        style={{ positionAnchor: anchorName }}
      >
        {content}
      </span>
    </>
  )
}

export default Tooltip
