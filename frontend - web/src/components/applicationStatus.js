import React, { useState } from 'react'
import { Card, Modal } from 'antd'
import Application from './application'
import { useSelector } from 'react-redux'


const ApplicationStatus = (props) => {
    
    const applications = useSelector(state => state.applications)

    return <div>
        <Card title={props.state} className="Application-cards">
            {
                applications.map( application => {
                    return <Application key={application.id} application={application} />
                })
            }
        </Card>
    </div>
}

export default ApplicationStatus