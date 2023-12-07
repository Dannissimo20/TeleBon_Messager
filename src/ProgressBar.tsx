import styled from "styled-components";

const Line = styled.div`
  position: relative;
  height: 8px;
  width: 100%;
  border-radius: 4px;
  background: rgba(16, 18, 32, 0.1);
  overflow: hidden;
  margin-top: 4px;
`;
const Progress = styled.div<{ $width: string | number }>`
  position: absolute;
  left: 0;
  height: 8px;
  background: ${(props) => props.theme.color.mainLight};
  width: ${(props) => props.$width}%;
`;
const Container = styled.div``;
const Title = styled.div`
  font-size: 14px;
  text-align: center;
`;
const Info = styled.div`
  font-size: 10px;
  opacity: 0.5;
  text-align: center;
`;

interface IProps {
    title?: string;
    value: string | number;
}

const ProgrerssBar: React.FC<IProps> = ({ title, value }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Line>
                <Progress $width={value} />
            </Line>
            <Info>{value}/100</Info>
        </Container>
    );
};

export default ProgrerssBar;
