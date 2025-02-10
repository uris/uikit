import { motion } from 'framer-motion';
import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const ErrorBox = styled(motion.div)`
  ${flexBox.columnStart};
  ${({ theme }) => theme.lyraType['body-l-regular']};
  font-weight: 480;
  line-height: 1.4em;
  width: 100%;
  background: ${({ theme }) => theme.lyraColors['core-outline-secondary']};
  color: ${({ theme }) => theme.lyraColors['feedback-warning']};
  border: 1px solid ${({ theme }) => theme.lyraColors['feedback-warning']};
  border-radius: 4px;
  padding: 0 16px;
  overflow: hidden;
  margin-bottom: 44px;
  padding-bottom: 16px;
  div.error {
    ${flexBox.columnStart};
    width: 100%;
    p {
      margin: 0;
      padding: 0;
      padding-top: 16px;
    }
    p strong {
      font-weight: 520;
    }
    ul {
      list-style-type: none;
      list-style-position: outside;
      margin: 0;
      padding: 0;
    }
    ul li {
      ${({ theme }) => theme.lyraType['body-l-regular']};
      margin: 3px 0 3px 0;
      line-height: 1.2em;
      padding: 0;
    }
  }
`;
