import { Card, Avatar } from 'antd';

interface LandingCardProps {  
  imgUrl: string; 
  title: string; 
  subTitle: string;
}  
const { Meta } = Card;

const LandingCard: React.FC<LandingCardProps> = ({ imgUrl,title,subTitle }) => {  

  return (
    <Card  style={{ width: 300,backgroundColor:'#f0f0f0'}}>
      <Meta
        title={title}
        description={subTitle}
        avatar={<Avatar src= {imgUrl} size={100} />}
      />
    </Card>
  );
}

export default LandingCard;