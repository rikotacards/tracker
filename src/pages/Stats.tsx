import React from 'react'; 
import {makeStyles, Theme, Typography} from '@material-ui/core'

const useStyes = makeStyles((theme: Theme) => ({
    root: {
        border: '1px solid black'
    }
}))

export const StatsPage: React.FC = () => {
    return (
        <div>
            <Typography>Stats</Typography>
        </div>

    )
}