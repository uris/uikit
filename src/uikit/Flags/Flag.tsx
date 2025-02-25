import { ReactComponent as Australia } from '../../assets/images/Australia.svg';
import { ReactComponent as Canada } from '../../assets/images/Canada.svg';
import { ReactComponent as France } from '../../assets/images/France.svg';
import { ReactComponent as Germany } from '../../assets/images/Germany.svg';
import { ReactComponent as USA } from '../../assets/images/USA.svg';
import { ReactComponent as India } from '../../assets/images/India.svg';
import { ReactComponent as Mexico } from '../../assets/images/Mexico.svg';
import { ReactComponent as Philippines } from '../../assets/images/Philippines.svg';
import { ReactComponent as Spain } from '../../assets/images/Spain.svg';
import { ReactComponent as UK } from '../../assets/images/United Kingdom.svg';
import { ReactComponent as China } from '../../assets/images/China.svg';
import * as Styled from './_Styles';

export enum FlagNames {
  Australia = 'Australia',
  USA = 'USA',
  UnitedStates = 'United States',
  US = 'US',
  Canada = 'Canada',
  Germany = 'Germany',
  France = 'France',
  China = 'China',
  India = 'India',
  Mexico = 'Mexico',
  Philippines = 'Philippines',
  UK = 'UK',
  UnitedKingdom = 'United Kingdom',
  Spain = 'Spain',
}

export interface FlagProps {
  flag?: string;
  size?: number;
}

export function Flag(props: FlagProps) {
  const { flag = undefined, size = 24 } = props;

  const getCountry = () => {
    switch (flag?.toLowerCase()) {
      case 'usa':
      case 'us':
      case 'united states':
        return <USA width={size} height={size} />;
      case 'australia':
        return <Australia width={size} height={size} />;
      case 'canada':
        return <Canada width={size} height={size} />;
      case 'germany':
        return <Germany width={size} height={size} />;
      case 'france':
        return <France width={size} height={size} />;
      case 'china':
        return <China width={size} height={size} />;
      case 'india':
        return <India width={size} height={size} />;
      case 'mexico':
        return <Mexico width={size} height={size} />;
      case 'philippines':
        return <Philippines width={size} height={size} />;
      case 'spain':
        return <Spain width={size} height={size} />;
      case 'uk':
      case 'united kingdom':
        return <UK width={size} height={size} />;
      default:
        return <USA width={size} height={size} />;
    }
  };
  if (!flag) return null;
  return (
    <Styled.Flag $size={size} title={flag}>
      {getCountry()}
    </Styled.Flag>
  );
}
