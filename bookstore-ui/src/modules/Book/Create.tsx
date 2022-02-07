import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
} from 'antd';
import React, { useEffect, useState } from 'react';

import AuthorService from '../../services/AuthorService';
import BookService from '../../services/BookService';
import GenreService from '../../services/GenreService';

const { Option } = Select;

interface Props {
    setIsCreateVisible: (value: boolean) => void;
}

const BookCreate: React.FC<Props> = ({ setIsCreateVisible }) => {
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genresId, setGenresId] = useState([]);
    const [selectGenres] = useState([
        {
            genreId: 0,
        },
    ]);

    useEffect(() => {
        GenreService.getAll()
            .then((response) => {
                setGenres(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        AuthorService.getAll()
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const genreSelect = (value: any) => {
        setGenresId(value);
    };

    const onFinish = (values: any) => {
        genresId.map((gn: number) => {
            selectGenres.push({
                genreId: gn,
            });
        });
        values.genres = selectGenres;
        values.genres.shift();
        console.log(values);
        BookService.create(values).then((response) => {
            if (response.status === 200) {
                message.success('Book created', 2, () => {
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
                            <Input placeholder="Book Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="description" label="Book description">
                            <Input placeholder="Description" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="pages" label="Book pages">
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} justify="center">
                    <Col span={8}>
                        <Form.Item name={['author', 'authorId']} label="Author">
                            <Select>
                                {authors.map((author: any) => (
                                    <Option
                                        key={author.authorId}
                                        value={author.authorId}
                                    >
                                        {author.name + ' ' + author.surname}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={['genres', 'genreId']} label="Genres">
                            <Select
                                mode="multiple"
                                allowClear
                                onChange={genreSelect}
                            >
                                {genres.map((genre: any) => (
                                    <Option
                                        key={genre.genreId}
                                        value={genre.genreId}
                                    >
                                        {genre.name}
                                    </Option>
                                ))}
                            </Select>
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

export default BookCreate;
