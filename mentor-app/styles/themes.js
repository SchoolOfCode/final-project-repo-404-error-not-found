// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import {theme as chakraTheme} from "@chakra-ui/react";
import { createBreakpoints} from "@chakra-ui/theme-tools";

const fonts = {
    ...chakraTheme.fonts, 
body: 
heading:
}

const breakpoints = createBreakpoints ({sm = })
const overrides = {
    ...chakraTheme, 
    fonts, 

}

const customTheme = extendTheme(overrides)

export default customTheme

// 2. Call `extendTheme` and pass your custom value

// 3. Pass the new theme to `ChakraProvider`

// 4. Now you can use these colors in your components
function Usage() {
  return <Box bg="brand.100">Welcome</Box>
}



// !important