import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, Space, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography } from '@material-tailwind/react';
import { UserOutlined, UploadOutlined, EnvironmentOutlined, MailOutlined, VerifiedOutlined, PhoneOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { createProfile } from '../../services/profile.service';
import { AppDispatch, RootState } from '../../store/store';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Profile = () => {
  const [address, setAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const {error, loading} = useSelector((state: RootState) => state.profile);

  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = async (selectedAddress: string, placeId: string) => {
    setAddress(selectedAddress);
    try {
      const results: any[] = await geocodeByAddress(selectedAddress);
      const { lat, lng } = await getLatLng(results[0]);      
      form.setFieldsValue({ address: selectedAddress, latitude: lat, longitude: lng });
      console.log({ address: selectedAddress, latitude: lat, longitude: lng });
      
    } catch (error) {
      console.error('Error', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const results = await geocodeByAddress(`${latitude},${longitude}`);
            setCurrentLocation(results[0].formatted_address);
          } catch (error: any) {
            message.error('Error', error);
          }
        },
        (error: any) => {
          return message.error('Error getting current location', error);
        }
      );
    } else {
      message.error('Geolocation is not supported by this browser.');
    }
  };

  const onFinish = (values: any) => {
    if (!values) {
      return;
    }
  
    const formData = new FormData();
    formData.append('profile[full_name]', values.full_name);
    formData.append('profile[address]', values.address);
    formData.append('profile[latitude]', values.latitude);
    formData.append('profile[longitude]', values.longitude);
    formData.append('profile[phone_number]', values.phone_number);
    formData.append('profile[email]', values.email);
    formData.append('profile[tpin]', values.tpin);
    formData.append('profile[business_name]', values.business_name);
    formData.append('profile[id_card]', values.id_card[0].originFileObj);
    formData.append('profile[selfie]', values.selfie[0].originFileObj);    
  
    dispatch(createProfile(formData))
      if(error) {
        message.error('Submit failed! ')
      } else {
        message.success('Submit success!')
        form.resetFields();
      }
  };
  

  const onFinishFailed = () => {
    message.error('Submit failed!' + error);
  };
  
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onFill = () => {
    form.setFieldsValue({
      address: currentLocation,
    });
  };

  return (
    <Card className='px-3'>
      <Typography className='text-center pb-5' variant="h3" color="blue-gray">
        Complete Profile
      </Typography>
      <div>
        <Form 
          form={form} name="validate_other" 
          {...formItemLayout} 
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 max-w-7xl' >
            <div className='lg:w-[50rem] overflow-clip'>
              <Form.Item
                {...formItemLayout}
                name="full_name"
                rules={[{ required: true, message: 'Please input your full name' }]}
                extra="Submit your legal name as it appears on legal documents."
              >
                <Input placeholder="Please input your name" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                name="address"
                rules={[{ required: true, message: 'Please input your address' }]}
                extra="Submit your residential address or press the button below to automatically fill your current location."
              >
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <Input {...getInputProps({ placeholder: 'Please input your address' })} prefix={<EnvironmentOutlined />} />
                      <div>
                        {loading &&  <Spin tip="Loading" size="small">
                          <div className="content" />
                        </Spin>}
                        {suggestions.map((suggestion) => (
                          <div className='cursor-pointer' {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                            {suggestion.description}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button htmlType="button" onClick={onFill}>
                    Set current location as address
                  </Button>
                </Space>
              </Form.Item>

              <Form.Item
                name="id_card"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Submit one of the following: a government-issued card, driver's licence, or passport."
                rules={[{ required: true, message: 'Please upload your identity card' }]}
              >
                <Upload beforeUpload={(file) => false} accept="image/*" name="id_card" listType="picture">
                  <Button icon={<UploadOutlined />}>Upload ID Card</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="selfie"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Submit your newly captured selfie."
                rules={[{ required: true, message: 'Please upload your selfie' }]}
              >
                <Upload beforeUpload={(file) => false} accept="image/*" name="selfie" listType="picture">
                  <Button icon={<UploadOutlined />}>Upload Selfie</Button>
                </Upload>
              </Form.Item>
            </div>
            
            <div className='lg:w-[50rem] overflow-clip'>
              <Form.Item
                {...formItemLayout}
                name="phone_number"
                rules={[{ required: true, message: 'Please input your phone number' }]}
                extra="Submit your valid phone number, our officials may contact you to quickly process your request."
              >
                <Input placeholder="Please input your phone number" prefix={<PhoneOutlined />} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
                extra="Submit your business email address."
              >
                <Input placeholder="Please input your email" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                name="tpin"
                rules={[{ required: true, message: 'Please input your tpin' }]}
                extra="Submit the company's Tax Identification Number"
              >
                <Input placeholder="Please input your tpin" prefix={<PropertySafetyOutlined />} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                name="business_name"
                rules={[{ required: true, message: 'Please input your business name' }]}
                extra="Submit the registered business name. Note that we will not process unverified business name."
              >
                <Input placeholder="Please input your business name" prefix={<VerifiedOutlined />} />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                name="longitude"
              >
                <Input type="hidden" />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="latitude"
              >
                <Input type="hidden" />
              </Form.Item>
            </div>
          </div>

          <Form.Item className='text-center max-w-full'>
            <Space wrap>
              <Button className='w-full lg:w-[50rem]' style={{backgroundColor: 'rgb(29 78 216)'}} type="primary" htmlType="submit" loading={loading === "pending"} >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default Profile;
