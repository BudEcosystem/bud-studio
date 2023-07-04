import React from 'react';
// import * as Avatar from '@radix-ui/react-avatar';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

const CircularImageComponent = ({ images = [] }) => {
  return (
    <div className="circularImageContainer">
      <Avatar.Group>
        <Avatar
          size={24}
          style={{ backgroundColor: '#f56a00', border: '1px solid black' }}
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        />
        <a href="https://ant.design">
          <Avatar
            size={24}
            style={{ backgroundColor: '#f56a00', border: '1px solid black' }}
          >
            K
          </Avatar>
        </a>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            size={24}
            style={{ backgroundColor: '#87d068', border: '1px solid black' }}
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          />
        </Tooltip>
        <Avatar
          size={24}
          style={{ backgroundColor: '#1677ff', border: '1px solid black' }}
          icon={<AntDesignOutlined rev={undefined} />}
        />
      </Avatar.Group>
      {/* <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
          CT
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Pedro Duarte"
        />
        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
          JD
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback className="AvatarFallback">PD</Avatar.Fallback>
      </Avatar.Root> */}
      {/* {images.map(item => (<div className='imgCircular'></div>))} */}
      <div className="imgCircular imgCircularTxt">+8</div>
    </div>
  );
};

export default CircularImageComponent;
