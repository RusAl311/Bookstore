import './Login.less';

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, Row } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthService from '../../services/Auth/AuthService';

type AuthData = {
    password: string;
    username: string;
};
export const Login: React.FC<RouteComponentProps> = (props) => {
    // const history = useHistory();
    const onSubmit = (values: AuthData) => {
        AuthService.login(values.username, values.password).then((response) => {
            if (response.status === 200) {
                props.history.push('/main/index');
                // window.location.reload();
            }
        });
    };

    const layout = {
        labelCol: { offset: 4, span: 8 },
        wrapperCol: { offset: 4, span: 16 },
    };
    return (
        <div className="login-wrap">
            <Form
                {...layout}
                name="normal_login"
                className="login-form"
                layout="vertical"
                onFinish={onSubmit}
            >
                <Row>
                    <Col span={6} offset={4}>
                        <Image width={160} preview={false} />
                    </Col>
                </Row>
                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeFilled /> : <EyeInvisibleFilled />
                        }
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
