import React from 'react'
import { Card } from 'antd'

const Application = (props) => {
    
    const { application } = props
    return <Card>
        {application.company}
    </Card>
}

export default Application