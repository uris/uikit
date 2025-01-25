import { flexBox } from "../../util/flexBox";
import * as Styled from "./_Styles";
import { useTheme } from "styled-components";

export interface PageDivProps {
  children?: any;
  scrollY?: boolean;
  scrollX?: boolean;
  background?: string;
  flex?: string;
  height?: string;
}

export function PageDiv(props: PageDivProps) {
  const theme = useTheme();
  const {
    children,
    scrollY = false,
    scrollX = false,
    background = theme.colors.bgNormal,
    flex = flexBox.columnStartCenter,
    height = "100vh",
  } = props;
  return (
    <Styled.BaseLayout
      $scrollX={scrollX}
      $scrollY={scrollY}
      $flexBox={flex}
      $height={height}
      $background={background}
    >
      {children}
    </Styled.BaseLayout>
  );
}
