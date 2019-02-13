import * as React from 'react'
import styled from 'styled-components'
import validProp from '@emotion/is-prop-valid'

export interface StyledIconProps extends React.SVGProps<SVGSVGElement> {
  'aria-hidden'?: string
  size?: number | string
  title?: string | null
}

interface StyledIconBaseProps {
  iconAttrs: React.SVGProps<SVGSVGElement>
  iconViewBox: string
  iconVerticalAlign: string
}

function isValidProp(key: string): key is keyof React.SVGProps<SVGSVGElement> {
  return validProp(key)
}

function filterSVGProps(props: StyledIconProps): React.SVGProps<SVGSVGElement> {
  return (Object.keys(props) as Array<keyof (StyledIconProps)>).reduce(
    (p, k) => {
      if (isValidProp(k)) {
        p[k] = props[k]
      }
      return p
    },
    {} as React.SVGProps<SVGSVGElement>,
  )
}

const StyledIconBase = React.forwardRef<SVGSVGElement, StyledIconProps & StyledIconBaseProps>(
  (props, ref) => {
    const {children, iconAttrs, iconVerticalAlign, iconViewBox, size, title, ...otherProps} = props

    const iconProps: React.SVGProps<SVGSVGElement> = {
      viewBox: iconViewBox,
      height: props.height !== undefined ? props.height : size,
      width: props.width !== undefined ? props.width : size,
      // @ts-ignore - aria is not always defined on SVG in React TypeScript types
      'aria-hidden': title == null ? 'true' : undefined,
      focusable: 'false',
      role: title != null ? 'img' : undefined,
      ...iconAttrs,
    }

    const svgProps = filterSVGProps(otherProps)

    return (
      <svg {...iconProps} {...svgProps} ref={ref}>
        {title && <title key="icon-title">{title}</title>}
        {children}
      </svg>
    )
  },
)

export const StyledIcon = styled(StyledIconBase)`
  display: inline-block;
  vertical-align: ${props => props.iconVerticalAlign};
  overflow: hidden;
`
