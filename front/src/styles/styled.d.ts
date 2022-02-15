// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {

  // ThemeProvider theme에 적용할 타입으로 theme의 인터페이스이다. theme의 속성과 동일하게 작성한다.
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
