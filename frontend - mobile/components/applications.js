import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { useSelector } from 'react-redux'
import ApplicationProspect from './applicationProspect'
import ApplicationApplied from './applicationApplied'
import ApplicationRejected from './applicationRejected'
import ApplicationAccepted from './applicationAccepted'

const Applications = (props) => {
    
    let data = []
    switch(props.state){
        case 'prospect':
            data = useSelector(state => state.prospect)
            break
        case 'pending':
            data = useSelector(state => state.pending)
            break
        case 'reject':
            data = useSelector(state => state.reject)
            break
        case 'accept':
            data = useSelector(state => state.accept)
            break
    }

    if(data.length === 0) {
        return <ScrollView>
            <Text>
                Nothing to display yet
            </Text>
        </ScrollView>
    } else {
        switch(props.state){
            case 'prospect': return <ScrollView>
                { 
                    data.map( (application) => {
                        return <ApplicationProspect key={application.AppId} info={application} />
                    })
                }
            </ScrollView>
            case 'pending':return <ScrollView>
                { 
                    data.map( (application) => {
                        return <ApplicationApplied key={application.AppId} info={application} />
                    })
                }
            </ScrollView>
            case 'reject':return <ScrollView>
                { 
                    data.map( (application) => {
                        return <ApplicationRejected key={application.AppId} info={application} />
                    })
                }
            </ScrollView>
            case 'accept':return <ScrollView>
                { 
                    data.map( (application) => {
                        return <ApplicationAccepted key={application.AppId} info={application} />
                    })
                }
            </ScrollView>
        }
    }
} 

export default Applications