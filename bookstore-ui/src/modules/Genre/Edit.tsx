import { Button, Col, Form, Input, message, Row } from 'antd';
import React, { useEffect } from 'react';

import GenreService from '../../services/GenreService';

interface Props {
    genId: number;
    setIsEditVisible: (value: boolean) => void;
}

const GenreEdit: React.FC<Props> = ({ genId, setIsEditVisible }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        retrieveGenre();
    }, [genId]);

    const retrieveGenre = () => {
        GenreService.get(genId)
            .then((response) => {
                form.setFieldsValue(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onFinish = (values: any) => {
        console.log(values);
        GenreService.update(genId, values).then((response) => {
            if (response.status === 200) {
                message.success('Genre edited', 2, () => {
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
                        <Form.Item name="name" label="Genre">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="description" label="Genre description">
                            <Input />
                        </Form.Item>
                        <Form.Item name="genreId" hidden />
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

export default GenreEdit;
