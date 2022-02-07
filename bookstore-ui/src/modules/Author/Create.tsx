import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';

import AuthorService from '../../services/AuthorService';

interface Props {
    setIsCreateVisible: (value: boolean) => void;
}

const AuthorCreate: React.FC<Props> = ({ setIsCreateVisible }) => {
    const onFinish = (values: any) => {
        console.log(values);
        AuthorService.create(values).then((response) => {
            if (response.status === 200) {
                message.success('Author created', 2, () => {
                    setIsCreateVisible(false);
                });
            }
        });
    };
    return (
        <>
            <Form onFinish={onFinish} layout="vertical">
                <Row gutter={24} justify="center">
                    <Col span={8}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Author Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="surname" label="Surname">
                            <Input placeholder="Author Surname" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AuthorCreate;
