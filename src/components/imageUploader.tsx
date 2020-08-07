import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload';
import { QNY } from '@/configs';

type Props = {
  image: string;
  setImage: Function;
  className?: string;
  disabled?: boolean;
};

const ImageUploader = ({ image, setImage, className, disabled }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const beforeUpload: UploadProps['beforeUpload'] = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('state: done, log to fix...');
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={className}
      showUploadList={false}
      customRequest={({ file }) => {
        const formData = new FormData();
        formData.append('file', file, file.name);
        console.log(file);
        fetch(
          `${QNY}/upload/redrockoss/cqupt-help-bms?key=${
            file.name.split('.')[0]
          }`,
          {
            method: 'POST',
            body: formData,
          },
        )
          .then(res => res.json())
          .then(json => {
            console.log(json);
            setImage(json.data.name);
          })
          .catch(message.error);
      }}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      disabled={disabled}
    >
      {image ? <img src={image} style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default ImageUploader;
