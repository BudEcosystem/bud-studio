import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { styled } from 'styled-components';
import { UnderLineDropDown } from '../../SVGs';

const CustomDropDownWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 120px;
  margin-top: 14px;
  margin-bottom: 14px;
`;
function CustomDropDown({ menu }: any) {
  return (
    <CustomDropDownWrapper>
      <Input
        prefix={<SearchOutlined style={{ color: '#7B8388' }} rev={undefined} />}
        placeholder="Search a property"
        className="custom-key-render-input"
      />
      {menu}
      <UnderLineDropDown />
      <ButtonWrapper>
        {' '}
        <Button
          icon={<PlusOutlined style={{ color: '#3D4047' }} rev={undefined} />}
          style={{
            color: '#3D4047',
            fontFamily: 'DM Sans',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}
          type="text"
        >
          Add Group
        </Button>
      </ButtonWrapper>
    </CustomDropDownWrapper>
  );
}
export default CustomDropDown;
