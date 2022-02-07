import { Modal, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { FilterHeader } from '../../components/Filters/FilterHeader';
import IGenre from '../../interfaces/Genre';
import GenreService from '../../services/GenreService';
import GenreCreate from './Create';
import GenreEdit from './Edit';

const GenreList: React.FC = () => {
    const [genId, setGenId] = useState(0);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const { data } = useQuery('genres', async () => {
        return await (
            await GenreService.getAll()
        ).data;
    });

    const onClickaddButton = () => {
        setIsCreateVisible(true);
    };

    const handleOk = () => {
        setIsCreateVisible(false);
    };

    const handleCancel = () => {
        setIsCreateVisible(false);
        setIsEditVisible(false);
    };

    const closeEdit = () => {
        setIsEditVisible(false);
    };

    const columns: ColumnsType<IGenre> = [
        {
            title: 'Genre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Genre description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <>
                    <Tag color="error">
                        <a
                            onClick={() =>
                                showDeleteConfirm(record.genreId, record.name)
                            }
                        >
                            Delete
                        </a>
                    </Tag>
                    <Tag color="blue">
                        <a
                            onClick={() => {
                                setIsEditVisible(true);
                                setGenId(record.genreId);
                            }}
                        >
                            Edit
                        </a>
                    </Tag>
                </>
            ),
        },
    ];

    return (
        <>
            <FilterHeader filter={0} setOffset={18} add={onClickaddButton} />
            <Modal
                title="Create a new Genre"
                visible={isCreateVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1300}
                style={{ top: 20 }}
                footer={''}
            >
                <GenreCreate setIsCreateVisible={setIsCreateVisible} />
            </Modal>
            <Modal
                title="Edit"
                visible={isEditVisible}
                onOk={closeEdit}
                onCancel={handleCancel}
                width={1300}
                style={{ top: 20 }}
                footer={''}
            >
                <GenreEdit genId={genId} setIsEditVisible={setIsEditVisible} />
            </Modal>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

function showDeleteConfirm(genreId: number, name: string) {
    confirm({
        title: 'Do you want to delete this genre?',
        icon: <ExclamationCircleOutlined />,
        content: `Genre: ${name} `,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            GenreService.remove(genreId);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

export default GenreList;
