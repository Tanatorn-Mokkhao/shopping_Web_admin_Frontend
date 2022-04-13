
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => {
    switch (props.color) {
        case 1:
        return 'rgb(224, 221, 224)'
      case 2:
        return 'rgb(248,249,254)'
        default:
            return 'white'
    }
}};
  }
`;


