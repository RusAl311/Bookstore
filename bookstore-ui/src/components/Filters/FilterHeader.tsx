import './FilterHeader.less';

import { FilterFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';

interface Props {
    filter?: number;
    add?: () => void;
    setOffset?: number;
    getFields?: () => void;
}

export const FilterHeader: React.FC<Props> = ({
    filter,
    add,
    setOffset,
    children,
}) => {
    const [activeFilter, setActiveFilter] = useState(false);
    const activeFilterState = () => {
        setActiveFilter(!activeFilter);
    };
    return (
        <>
            <Row className="header">
                {filter === 0 ? (
                    ''
                ) : (
                    <Col span={2} className="filter-button-border">
                        <Button
                            type="default"
                            icon={<FilterFilled />}
                            onClick={activeFilterState}
                        >
                            Filter({filter})
                        </Button>
                    </Col>
                )}

                <Col span={2} offset={setOffset} className="add-button-border">
                    <Button
                        className="add-button"
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={add}
                    >
                        Add new
                    </Button>
                </Col>
            </Row>
            {activeFilter ? <>{children}</> : ''}
        </>
    );
};
