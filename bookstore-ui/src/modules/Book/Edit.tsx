import { Button, Col, Form, Input, InputNumber, message, Row } from 'antd';
import React, { useEffect } from 'react';

import BookService from '../../services/BookService';

const { TextArea } = Input;
interface Props {
    booId: number;
    setIsEditVisible: (value: boolean) => void;
}

const BookEdit: React.FC<Props> = ({ booId, setIsEditVisible }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        retrieveAuthor();
    }, [booId]);

    const retrieveAuthor = () => {
        BookService.get(booId)
            .then((response) => {
                form.setFieldsValue(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onFinish = (values: any) => {
        console.log(values);
        BookService.update(booId, values).then((response) => {
            if (response.status === 200) {
                message.success('Book edited', 2, () => {
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
                        <Form.Item name="name" label="Book name">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="description" label="Book description">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="pages" label="Book pages">
                            <InputNumber />
                        </Form.Item>
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

export default BookEdit;
