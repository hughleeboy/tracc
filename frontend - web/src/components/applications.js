import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Row, Col } from 'antd'
import ApplicationStatus from './applicationStatus'

const Applications = () => {

    const status = useSelector(state => state.status)

    return <div>
        <Row>
            {   
                status && status.map( (state) => {
                    return <Col span={6} key={state}><ApplicationStatus state={state}/></Col>
                })
            }
        </Row>
    </div>
}

export default Applications