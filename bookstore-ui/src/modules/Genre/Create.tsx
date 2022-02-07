import { Button, Col, Form, Input, message, Row } from 'antd';
import React from 'react';

import GenreService from '../../services/GenreService';

interface Props {
    setIsCreateVisible: (value: boolean) => void;
}

const GenreCreate: React.FC<Props> = ({ setIsCreateVisible }) => {
    const onFinish = (values: any) => {
        console.log(values);
        GenreService.create(values).then((response) => {
            if (response.status === 200) {
                message.success('Genre created', 2, () => {
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
                        <Form.Item name="name" label="Genre">
                            <Input placeholder="Genre" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="description" label="Genre description">
                            <Input placeholder="Genre description" />
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

export default GenreCreate;
