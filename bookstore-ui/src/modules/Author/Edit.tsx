import { Button, Col, Form, Input, message, Row } from 'antd';
import React, { useEffect } from 'react';

import AuthorService from '../../services/AuthorService';

interface Props {
    authId: number;
    setIsEditVisible: (value: boolean) => void;
}

const AuthorEdit: React.FC<Props> = ({ authId, setIsEditVisible }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        retrieveAuthor();
    }, [authId]);

    const retrieveAuthor = () => {
        AuthorService.get(authId)
            .then((response) => {
                form.setFieldsValue(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onFinish = (values: any) => {
        console.log(values);
        AuthorService.update(authId, values).then((response) => {
            if (response.status === 200) {
                message.success('Author edited', 2, () => {
                    setIsEditVisible(false);
                });
            }
        });
    };

    return (
        <>
            <Form onFinish={onFinish} form={form} layout="vertical">
                <Row gutter={24} justify="center">
                    <Col span={8}>
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="surname" label="Surname">
                            <Input />
                        </Form.Item>
                        <Form.Item name="authorId" hidden />
                    </Col>
                </Row>
                <div className="ant-modal-footer">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default AuthorEdit;
